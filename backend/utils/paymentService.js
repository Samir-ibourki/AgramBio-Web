import BankInfo from "../models/BankInfo.js";


class PaymentService {
  /**
   * Fetches active bank accounts for Bank Transfer
   * @returns {Promise<Array>} List of bank accounts
   */
  async getActiveBankAccounts() {
    return await BankInfo.findAll({ where: { isActive: true } });
  }
}

export default new PaymentService();
