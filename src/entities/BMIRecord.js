// src/Entities/BMIRecord.js

export const BMIRecord = {
  records: [
    // initial mock data (optional)
    { height: 175, weight: 70, bmi: 22.9, category: "normal", unit_system: "metric" }
  ],

  list: async () => {
    return BMIRecordService.records;
  },

  create: async (record) => {
    // optionally validate using the JSON schema
    BMIRecordService.records.push(record);
    return record;
  }
};
