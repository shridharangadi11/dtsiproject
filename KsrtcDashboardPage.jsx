
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Save, Download, UploadCloud, Search, RotateCcw, CalendarDays, Clock, PlusCircle, Trash2 } from 'lucide-react';
import { storeData, getData } from '@/services/localStorage';
import * as XLSX from 'xlsx';
import { useLanguage, getTranslation } from '@/contexts/LanguageContext';

const MAX_TIMING_BLOCKS = 10;

const initialTimingBlock = () => ({
  slot1: '', // Could be 'Type' or 'Reason'
  slot2: '', // Could be 'Start Time'
  slot3: '', // Could be 'End Time'
  actual: '', // Could be 'Actual Time' or 'Duration'
});

const initialRoute = () => ({
  id: Date.now() + Math.random(),
  routeNo: '',
  code: '',
  expectedTime: '',
  timings: {}, // Will be populated with { 'DD-Mon_Day': [initialTimingBlock(), ...] }
});

const formatDateWithDay = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${date.toLocaleString('default', { month: 'short' })}`;
  return `${formattedDate}_${day}`;
};

const KsrtcDashboardPage = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [routes, setRoutes] = useState([initialRoute()]);
  const [searchRouteNo, setSearchRouteNo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentDateColumns, setCurrentDateColumns] = useState([]);

  useEffect(() => {
    const savedRoutes = getData('ksrtcRoutes');
    if (savedRoutes && savedRoutes.length > 0) {
      setRoutes(savedRoutes.map(route => ({
        ...route,
        timings: route.timings || {} 
      })));
    }
    const savedDates = getData('ksrtcDateColumns');
    if (savedDates && savedDates.length > 0) {
      setCurrentDateColumns(savedDates);
    } else {
      const today = new Date();
      const formattedTodayKey = formatDateWithDay(today);
      setCurrentDateColumns([formattedTodayKey]);
      // Initialize today's timing blocks for existing routes
      setRoutes(prevRoutes => prevRoutes.map(r => ({
        ...r,
        timings: {
          ...r.timings,
          [formattedTodayKey]: r.timings?.[formattedTodayKey] || Array(1).fill(null).map(() => initialTimingBlock())
        }
      })));
    }
  }, []);

  const handleInputChange = (routeId, field, value, dateKey = null, blockIndex = null, slotKey = null) => {
    setRoutes(prevRoutes =>
      prevRoutes.map(route => {
        if (route.id === routeId) {
          if (dateKey !== null && blockIndex !== null && slotKey !== null) {
            const updatedTimings = { ...route.timings };
            if (!updatedTimings[dateKey]) {
              updatedTimings[dateKey] = Array(MAX_TIMING_BLOCKS).fill(null).map(() => initialTimingBlock());
            }
            const newDateTimings = [...updatedTimings[dateKey]];
            newDateTimings[blockIndex] = {
              ...newDateTimings[blockIndex],
              [slotKey]: value,
            };
            updatedTimings[dateKey] = newDateTimings;
            return { ...route, timings: updatedTimings };
          }
          return { ...route, [field]: value };
        }
        return route;
      })
    );
  };

  const addTimingBlock = (routeId, dateKey) => {
    setRoutes(prevRoutes => prevRoutes.map(route => {
      if (route.id === routeId) {
        const updatedTimings = { ...route.timings };
        if (!updatedTimings[dateKey]) {
          updatedTimings[dateKey] = [];
        }
        if (updatedTimings[dateKey].length < MAX_TIMING_BLOCKS) {
          updatedTimings[dateKey] = [...updatedTimings[dateKey], initialTimingBlock()];
        } else {
          toast({ title: getTranslation(language, 'maxBlocksReached'), description: getTranslation(language, 'maxBlocksDetail', {max: MAX_TIMING_BLOCKS}), variant: "destructive" });
        }
        return { ...route, timings: updatedTimings };
      }
      return route;
    }));
  };
  
  const removeTimingBlock = (routeId, dateKey, blockIndex) => {
     setRoutes(prevRoutes => prevRoutes.map(route => {
      if (route.id === routeId) {
        const updatedTimings = { ...route.timings };
        if (updatedTimings[dateKey] && updatedTimings[dateKey][blockIndex]) {
          updatedTimings[dateKey] = updatedTimings[dateKey].filter((_, i) => i !== blockIndex);
           if (updatedTimings[dateKey].length === 0) { // Add a default block if all are removed
            updatedTimings[dateKey] = [initialTimingBlock()];
          }
        }
        return { ...route, timings: updatedTimings };
      }
      return route;
    }));
    toast({ title: getTranslation(language, 'timingBlockRemoved'), description: getTranslation(language, 'timingBlockRemovedDetail') });
  };


  const addRoute = () => {
    const newRoute = initialRoute();
    // Initialize timing blocks for current dates
    currentDateColumns.forEach(dateKey => {
      newRoute.timings[dateKey] = Array(1).fill(null).map(() => initialTimingBlock());
    });
    setRoutes(prevRoutes => [...prevRoutes, newRoute]);
  };

  const removeRoute = (id) => {
    setRoutes(prevRoutes => prevRoutes.filter(route => route.id !== id));
    toast({ title: getTranslation(language, 'routeRemoved'), description: getTranslation(language, 'routeRemovedDetail') });
  };

  const handleSaveData = () => {
    storeData('ksrtcRoutes', routes);
    storeData('ksrtcDateColumns', currentDateColumns);
    toast({ title: getTranslation(language, 'dataSaved'), description: getTranslation(language, 'dataSavedDetail') });
  };

  const handleLoadTable = () => {
    if (!startDate || !endDate) {
      toast({ title: getTranslation(language, 'error'), description: getTranslation(language, 'selectDatesError'), variant: "destructive" });
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      toast({ title: getTranslation(language, 'error'), description: getTranslation(language, 'dateOrderError'), variant: "destructive" });
      return;
    }

    const dates = [];
    let currentDateIter = new Date(start);
    while (currentDateIter <= end) {
      dates.push(formatDateWithDay(currentDateIter));
      currentDateIter.setDate(currentDateIter.getDate() + 1);
    }
    setCurrentDateColumns(dates);

    setRoutes(prevRoutes => prevRoutes.map(route => {
      const newTimings = { ...route.timings };
      dates.forEach(dateKey => {
        if (!newTimings[dateKey] || newTimings[dateKey].length === 0) {
          newTimings[dateKey] = Array(1).fill(null).map(() => initialTimingBlock());
        }
      });
      return { ...route, timings: newTimings };
    }));

    toast({ title: getTranslation(language, 'tableLoaded'), description: getTranslation(language, 'tableLoadedDetail', {startDate, endDate}) });
  };
  
  const handleClearSearch = () => {
    setSearchRouteNo('');
  };

  const filteredRoutes = routes.filter(route => 
    route.routeNo.toLowerCase().includes(searchRouteNo.toLowerCase())
  );

  const exportToCSV = (dataToExport, filename) => {
    const worksheetData = [];
    // Header Row
    const header = ['Route No', 'Code', 'Expected Time'];
    currentDateColumns.forEach(dateKey => {
      const [datePart, dayPart] = dateKey.split('_');
      for (let i = 0; i < MAX_TIMING_BLOCKS; i++) {
        header.push(`${datePart} (${dayPart}) Block ${i+1} - Slot1`);
        header.push(`${datePart} (${dayPart}) Block ${i+1} - Slot2`);
        header.push(`${datePart} (${dayPart}) Block ${i+1} - Slot3`);
        header.push(`${datePart} (${dayPart}) Block ${i+1} - Actual`);
      }
    });
    worksheetData.push(header);

    // Data Rows
    dataToExport.forEach(route => {
      const row = [route.routeNo, route.code, route.expectedTime];
      currentDateColumns.forEach(dateKey => {
        const timingBlocks = route.timings[dateKey] || [];
        for (let i = 0; i < MAX_TIMING_BLOCKS; i++) {
          const block = timingBlocks[i] || {};
          row.push(block.slot1 || '');
          row.push(block.slot2 || '');
          row.push(block.slot3 || '');
          row.push(block.actual || '');
        }
      });
      worksheetData.push(row);
    });
    
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${filename}.csv`);
    toast({ title: getTranslation(language, 'dataExported'), description: getTranslation(language, 'dataExportedDetail', {filename: `${filename}.csv`}) });
  };

  const handleDownloadAllData = () => {
    exportToCSV(routes, 'KSRTC_All_Bus_Timings');
  };

  const handleExportFilteredData = () => {
    exportToCSV(filteredRoutes, 'KSRTC_Filtered_Bus_Timings');
  };
  
  const slotPlaceholders = {
    slot1: getTranslation(language, 'slot1Placeholder'),
    slot2: getTranslation(language, 'slot2Placeholder'),
    slot3: getTranslation(language, 'slot3Placeholder'),
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center pb-4 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{getTranslation(language, 'controllerDashboardTitle')}</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-4 md:space-y-0 md:flex md:flex-wrap md:items-end md:gap-4">
        <Button onClick={handleSaveData} className="w-full md:w-auto bg-green-600 hover:bg-green-700"><Save className="mr-2 h-4 w-4" />{getTranslation(language, 'saveData')}</Button>
        <Button onClick={handleDownloadAllData} variant="outline" className="w-full md:w-auto"><Download className="mr-2 h-4 w-4" />{getTranslation(language, 'downloadExcel')}</Button>
        <Button onClick={handleExportFilteredData} variant="outline" className="w-full md:w-auto"><UploadCloud className="mr-2 h-4 w-4" />{getTranslation(language, 'exportFilteredData')}</Button>
        
        <div className="flex-grow"></div>

        <div className="flex flex-col space-y-1 w-full md:w-auto">
          <Label htmlFor="startDate">{getTranslation(language, 'startDate')}</Label>
          <Input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="dark:bg-gray-700 dark:text-white"/>
        </div>
        <div className="flex flex-col space-y-1 w-full md:w-auto">
          <Label htmlFor="endDate">{getTranslation(language, 'endDate')}</Label>
          <Input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="dark:bg-gray-700 dark:text-white"/>
        </div>
        <Button onClick={handleLoadTable} className="w-full md:w-auto"><CalendarDays className="mr-2 h-4 w-4" />{getTranslation(language, 'loadTable')}</Button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col md:flex-row items-center gap-4">
        <Label htmlFor="searchRouteNo" className="whitespace-nowrap">{getTranslation(language, 'enterRouteNo')}</Label>
        <Input 
          type="text" 
          id="searchRouteNo" 
          placeholder={getTranslation(language, 'searchByRouteNoPlaceholder')}
          value={searchRouteNo} 
          onChange={(e) => setSearchRouteNo(e.target.value)}
          className="flex-grow dark:bg-gray-700 dark:text-white"
        />
        <Button onClick={() => {}} className="w-full md:w-auto"><Search className="mr-2 h-4 w-4" />{getTranslation(language, 'search')}</Button>
        <Button onClick={handleClearSearch} variant="outline" className="w-full md:w-auto"><RotateCcw className="mr-2 h-4 w-4" />{getTranslation(language, 'clear')}</Button>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 p-2 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{getTranslation(language, 'routeNo')}</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{getTranslation(language, 'code')}</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{getTranslation(language, 'expectedTime')}</th>
              {currentDateColumns.map(dateKey => {
                const [datePart, dayPart] = dateKey.split('_');
                return <th key={dateKey} className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">{`${datePart} (${dayPart})`}</th>;
              })}
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{getTranslation(language, 'actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredRoutes.map((route) => (
              <tr key={route.id}>
                <td className="px-3 py-2 whitespace-nowrap"><Input type="text" value={route.routeNo} onChange={(e) => handleInputChange(route.id, 'routeNo', e.target.value)} className="w-24 text-sm dark:bg-gray-700 dark:text-white" /></td>
                <td className="px-3 py-2 whitespace-nowrap"><Input type="text" value={route.code} onChange={(e) => handleInputChange(route.id, 'code', e.target.value)} className="w-20 text-sm dark:bg-gray-700 dark:text-white" /></td>
                <td className="px-3 py-2 whitespace-nowrap"><Input type="time" value={route.expectedTime} onChange={(e) => handleInputChange(route.id, 'expectedTime', e.target.value)} className="w-32 text-sm dark:bg-gray-700 dark:text-white" /></td>
                {currentDateColumns.map(dateKey => (
                  <td key={dateKey} className="px-3 py-2 whitespace-nowrap align-top">
                    <div className="space-y-2">
                      {(route.timings[dateKey] || Array(1).fill(null).map(() => initialTimingBlock())).map((block, blockIndex) => (
                        <div key={blockIndex} className="flex flex-col gap-1 p-2 border border-gray-200 dark:border-gray-600 rounded">
                          <div className="flex items-center justify-between">
                             <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Block {blockIndex + 1}</span>
                             { (route.timings[dateKey]?.length > 1 || blockIndex > 0) &&
                                <Button variant="ghost" size="icon" onClick={() => removeTimingBlock(route.id, dateKey, blockIndex)} className="text-red-500 hover:text-red-700 h-6 w-6">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                             }
                          </div>
                          {Object.keys(initialTimingBlock()).map(slotKey => (
                            <div key={slotKey} className="flex items-center gap-1">
                              <Label htmlFor={`${route.id}-${dateKey}-${blockIndex}-${slotKey}`} className="text-xs w-12 truncate">{slotPlaceholders[slotKey] || slotKey}</Label>
                              <Input 
                                id={`${route.id}-${dateKey}-${blockIndex}-${slotKey}`}
                                type={slotKey === 'actual' ? 'time' : 'text'} 
                                placeholder={slotKey === 'actual' ? '' : slotKey.charAt(slotKey.length-1)} 
                                value={block[slotKey] || ''} 
                                onChange={(e) => handleInputChange(route.id, '', e.target.value, dateKey, blockIndex, slotKey)} 
                                className={`w-full text-xs dark:bg-gray-700 dark:text-white ${slotKey === 'actual' ? 'pl-7' : ''}`} 
                              />
                              {slotKey === 'actual' && <Clock className="absolute left-1 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />}
                            </div>
                          ))}
                        </div>
                      ))}
                      { (route.timings[dateKey]?.length || 0) < MAX_TIMING_BLOCKS &&
                        <Button size="sm" variant="outline" onClick={() => addTimingBlock(route.id, dateKey)} className="w-full mt-1 text-xs">
                          <PlusCircle className="mr-1 h-3 w-3" /> {getTranslation(language, 'addBlock')}
                        </Button>
                      }
                    </div>
                  </td>
                ))}
                <td className="px-3 py-2 whitespace-nowrap align-top">
                  <Button variant="ghost" size="icon" onClick={() => removeRoute(route.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button onClick={addRoute} variant="outline" className="mt-4"><PlusCircle className="mr-2 h-4 w-4" />{getTranslation(language, 'addNewRoute')}</Button>
    </motion.div>
  );
};

export default KsrtcDashboardPage;
