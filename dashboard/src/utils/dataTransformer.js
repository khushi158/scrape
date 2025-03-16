// utils/dataTransformer.js
export const transformData = (rawData) => {
    // The first few rows are headers, so we'll skip them
    const relevantData = rawData.slice(3);
    
    return relevantData.map(row => {
      // The manufacturer name is in the "Unnamed: 1" column
      const manufacturer = row['Unnamed: 1'];
      
      // Extract monthly data
      const jan = parseInt(row['Unnamed: 2'] || 0);
      const feb = parseInt(row['Unnamed: 3'] || 0);
      const mar = parseInt(row['Unnamed: 4'] || 0);
      
      // Calculate total
      const total = jan + feb + mar;
      
      return {
        manufacturer,
        JAN: jan,
        FEB: feb,
        MAR: mar,
        TOTAL: total
      };
    }).filter(item => item.manufacturer); // Remove any rows without a manufacturer
  };
  
  // Function to get top sellers
  export const getTopSellers = (data, count = 10) => {
    return data.sort((a, b) => b.TOTAL - a.TOTAL).slice(0, count);
  };