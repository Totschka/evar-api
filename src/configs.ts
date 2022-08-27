export const configs = {
  dbConn: process.env.DATABASE_CONN,
  minChargeAmount: +process.env.MIN_CHARGE_AMOUNT || 10,
  maxChargeAmount: +process.env.MAX_CHARGE_AMOUNT || 50,
};
