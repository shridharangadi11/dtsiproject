
import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    KSRTCControllerPortal: "KSRTC Controller Portal",
    Feedback: "Feedback",
    Profile: "Profile",
    Logout: "Logout",
    English: "English",
    Kannada: "ಕನ್ನಡ",
    controllerDashboardTitle: "Controller Dashboard",
    saveData: "Save Data",
    downloadExcel: "Download CSV",
    exportFilteredData: "Export Filtered CSV",
    startDate: "Start Date",
    endDate: "End Date",
    loadTable: "Load Table",
    enterRouteNo: "Enter Route No",
    searchByRouteNoPlaceholder: "Search by Route No...",
    search: "Search",
    clear: "Clear",
    routeNo: "Route No",
    code: "Code",
    expectedTime: "Expected Time",
    actions: "Actions",
    addNewRoute: "Add New Route",
    addBlock: "Add Block",
    maxBlocksReached: "Max Blocks Reached",
    maxBlocksDetail: "Cannot add more than {max} timing blocks per day.",
    timingBlockRemoved: "Timing Block Removed",
    timingBlockRemovedDetail: "The timing block has been removed.",
    routeRemoved: "Route Removed",
    routeRemovedDetail: "The route entry has been removed.",
    dataSaved: "Data Saved",
    dataSavedDetail: "Bus timings have been saved locally.",
    error: "Error",
    selectDatesError: "Please select both Start and End Dates.",
    dateOrderError: "Start Date cannot be after End Date.",
    tableLoaded: "Table Loaded",
    tableLoadedDetail: "Displaying timings for {startDate} to {endDate}.",
    dataExported: "Data Exported",
    dataExportedDetail: "Data exported to {filename}.",
    slot1Placeholder: "Type",
    slot2Placeholder: "Start",
    slot3Placeholder: "End",
    actualPlaceholder: "Actual",
  },
  kn: {
    KSRTCControllerPortal: "ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ನಿಯಂತ್ರಕ ಪೋರ್ಟಲ್",
    Feedback: "ಪ್ರತಿಕ್ರಿಯೆ",
    Profile: "ಪ್ರೊಫೈಲ್",
    Logout: "ಲಾಗ್ ಔಟ್",
    English: "English",
    Kannada: "ಕನ್ನಡ",
    controllerDashboardTitle: "ನಿಯಂತ್ರಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    saveData: "ಡೇಟಾ ಉಳಿಸಿ",
    downloadExcel: "CSV ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    exportFilteredData: "ಫಿಲ್ಟರ್ ಮಾಡಿದ CSV ರಫ್ತು ಮಾಡಿ",
    startDate: "ಪ್ರಾರಂಭ ದಿನಾಂಕ",
    endDate: "ಅಂತಿಮ ದಿನಾಂಕ",
    loadTable: "ಟೇಬಲ್ ಲೋಡ್ ಮಾಡಿ",
    enterRouteNo: "ಮಾರ್ಗ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ",
    searchByRouteNoPlaceholder: "ಮಾರ್ಗ ಸಂಖ್ಯೆಯಿಂದ ಹುಡುಕಿ...",
    search: "ಹುಡುಕಿ",
    clear: "ಅಳಿಸಿ",
    routeNo: "ಮಾರ್ಗ ಸಂಖ್ಯೆ",
    code: "ಕೋಡ್",
    expectedTime: "ನಿರೀಕ್ಷಿತ ಸಮಯ",
    actions: "ಕ್ರಿಯೆಗಳು",
    addNewRoute: "ಹೊಸ ಮಾರ್ಗ ಸೇರಿಸಿ",
    addBlock: "ಬ್ಲಾಕ್ ಸೇರಿಸಿ",
    maxBlocksReached: "ಗರಿಷ್ಠ ಬ್ಲಾಕ್‌ಗಳನ್ನು ತಲುಪಲಾಗಿದೆ",
    maxBlocksDetail: "ಪ್ರತಿದಿನ {max} ಕ್ಕಿಂತ ಹೆಚ್ಚು ಸಮಯದ ಬ್ಲಾಕ್‌ಗಳನ್ನು ಸೇರಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.",
    timingBlockRemoved: "ಸಮಯದ ಬ್ಲಾಕ್ ತೆಗೆದುಹಾಕಲಾಗಿದೆ",
    timingBlockRemovedDetail: "ಸಮಯದ ಬ್ಲಾಕ್ ಅನ್ನು ತೆಗೆದುಹಾಕಲಾಗಿದೆ.",
    routeRemoved: "ಮಾರ್ಗ ತೆಗೆದುಹಾಕಲಾಗಿದೆ",
    routeRemovedDetail: "ಮಾರ್ಗ ನಮೂದನ್ನು ತೆಗೆದುಹಾಕಲಾಗಿದೆ.",
    dataSaved: "ಡೇಟಾ ಉಳಿಸಲಾಗಿದೆ",
    dataSavedDetail: "ಬಸ್ ಸಮಯಗಳನ್ನು ಸ್ಥಳೀಯವಾಗಿ ಉಳಿಸಲಾಗಿದೆ.",
    error: "ದೋಷ",
    selectDatesError: "ದಯವಿಟ್ಟು ಪ್ರಾರಂಭ ಮತ್ತು ಅಂತಿಮ ದಿನಾಂಕಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    dateOrderError: "ಪ್ರಾರಂಭ ದಿನಾಂಕವು ಅಂತಿಮ ದಿನಾಂಕದ ನಂತರ ಇರಬಾರದು.",
    tableLoaded: "ಟೇಬಲ್ ಲೋಡ್ ಆಗಿದೆ",
    tableLoadedDetail: "{startDate} ರಿಂದ {endDate} ವರೆಗಿನ ಸಮಯಗಳನ್ನು ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತಿದೆ.",
    dataExported: "ಡೇಟಾ ರಫ್ತು ಮಾಡಲಾಗಿದೆ",
    dataExportedDetail: "{filename} ಗೆ ಡೇಟಾ ರಫ್ತು ಮಾಡಲಾಗಿದೆ.",
    slot1Placeholder: "ಪ್ರಕಾರ",
    slot2Placeholder: "ಪ್ರಾರಂಭ",
    slot3Placeholder: "ಅಂತ್ಯ",
    actualPlaceholder: "ನಿಜವಾದ",
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const getTranslation = (language, key, options = {}) => {
  let translation = translations[language]?.[key] || translations.en[key] || key;
  Object.keys(options).forEach(optionKey => {
    translation = translation.replace(`{${optionKey}}`, options[optionKey]);
  });
  return translation;
};
