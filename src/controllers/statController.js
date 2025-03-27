const Expense = require('../models/expense');
const Category = require('../models/category');
const SubCategory = require('../models/subCategory');
const { QueryTypes } = require('sequelize');

exports.getStats = async (req, res) => {
    const { bulan, category_id } = req.query;
    if (!bulan) return res.status(400).json({ message: "Parameter bulan wajib" });

    try {
        let whereClause = `WHERE TO_CHAR(e.date AT TIME ZONE 'Asia/Jakarta', 'YYYY-MM') = :bulan`;
        let groupByClause, selectClause, header;

        if (category_id) {
            // Statistik per sub-kategori dalam kategori tertentu
            whereClause += ` AND c.id = :category_id`;
            groupByClause = `s.name`;
            selectClause = `s.name AS kategori, SUM(e.amount) AS total_pengeluaran`;
            header = ['Sub Kategori', 'Pengeluaran', { role: "annotation" }];
        } else {
            // Statistik per kategori
            groupByClause = `c.name`;
            selectClause = `c.name AS kategori, SUM(e.amount) AS total_pengeluaran`;
            header = ['Kategori', 'Pengeluaran', { role: "annotation" }];
        }

        const stats = await Expense.sequelize.query(
            `SELECT ${selectClause} 
             FROM expenses e
             JOIN sub_categories s ON e.sub_category_id = s.id
             JOIN categories c ON s.category_id = c.id
             ${whereClause}
             GROUP BY ${groupByClause}
             ORDER BY total_pengeluaran DESC`,
            {
                type: Expense.sequelize.QueryTypes.SELECT,
                replacements: { bulan, category_id }
            }
        );

        // Format output sesuai kebutuhan
        const formattedStats = [header, ...stats.map(row => [row.kategori, Number(row.total_pengeluaran), Number(row.total_pengeluaran)])];

        res.json(formattedStats);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};


