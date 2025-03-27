const Expense = require('../models/expense');

exports.addExpense = async (req, res) => {
    const { amount, sub_category_id, notes } = req.body;
    if (!amount || !sub_category_id) return res.status(400).json({ message: "Data tidak lengkap" });

    try {
        const expense = await Expense.create({ amount, sub_category_id, notes });
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

exports.getExpenses = async (req, res) => {
    const { bulan, category_id, sub_category_id } = req.query;
    if (!bulan) return res.status(400).json({ message: "Parameter bulan wajib" });

    try {
        let whereClause = `WHERE TO_CHAR(e.date AT TIME ZONE 'Asia/Jakarta', 'YYYY-MM') = :bulan`;
        if (category_id) whereClause += ` AND s.category_id = :category_id`;
        if (sub_category_id) whereClause += ` AND e.sub_category_id = :sub_category_id`;

        const query = `SELECT e.*,
                    c.name AS category_name, 
                    s.name AS sub_category_name 
             FROM "expenses" e
             LEFT JOIN "sub_categories" s ON e.sub_category_id = s.id
             LEFT JOIN "categories" c ON s.category_id = c.id
             ${whereClause} 
             ORDER BY e.date ASC`;
        const expenses = await Expense.sequelize.query(query,
            {
                type: Expense.sequelize.QueryTypes.SELECT,
                replacements: { bulan, category_id, sub_category_id }
            }
        );
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};
