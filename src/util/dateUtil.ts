export const formatDateToDMY = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
  };
  
  export const calculateEndDate = (startDate: Date, years: number, months: number): Date => {
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + years);
    endDate.setMonth(endDate.getMonth() + months);
    return endDate;
  };