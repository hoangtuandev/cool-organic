const db = require('../configs/database')

const Order = {
    addOrder: (req, callback) => {
        return db.query('INSERT INTO donhang(dh_id, dh_taikhoan, dh_ngaydathang, dh_trangthai, dh_diachi, dh_sodienthoai, dh_hinhthucthanhtoan, dh_thanhtoan) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
            [req.body.idOrder, req.body.client, req.body.dateTime, 'CHOXACNHAN', req.body.address, req.body.phone, req.body.typePayment, req.body.total], callback)
    },

    getAllOrders: (req, callback) => {
        return db.query(`SELECT *, date_format(dh_ngaydathang, '%d/%m/%Y %H:%i') as dh_ngaydathang FROM donhang DH JOIN taikhoankhachhang TKKH ON DH.dh_taikhoan = TKKH.tkkh_sodienthoai JOIN trangthaidonhang TTDH ON TTDH.ttdh_id = dh_trangthai ORDER BY dh_ngaydathang DESC;`, callback)
    },

    cancelOrder: (req, callback) => {
        return db.query(`UPDATE donhang SET dh_trangthai='DAHUY' WHERE dh_id='${req.body.id}'`, callback)
    },

    updateStateOrder: (req, callback) => {
        return db.query(`UPDATE donhang SET dh_trangthai='${req.body.state}' WHERE dh_id='${req.body.id}'`, callback)
    },

    acceptOrder: (req, callback) => {
        return db.query(`UPDATE donhang SET dh_trangthai='DANHANDON' WHERE dh_id='${req.body.id}'`, callback)
    },

    deleteOrder: (req, callback) => {
        return db.query(`DELETE FROM donhang WHERE dh_id='${req.body.id}'`, callback)
    },

    getTotalSales: (req, callback) => {
        return db.query(`SELECT SUM(dh_thanhtoan) AS TotalSales FROM donhang WHERE dh_trangthai='THANHCONG'`, callback)
    },

    getAmountOrdersCancel: (req, callback) => {
        return db.query(`SELECT COUNT(dh_id) AS amount FROM donhang WHERE dh_trangthai='DAHUY'`, callback)
    },

    getAmountOrdersSuccess: (req, callback) => {
        return db.query(`SELECT COUNT(dh_id) AS amount FROM donhang WHERE dh_trangthai='THANHCONG'`, callback)
    },

    getAmountOrdersProcessing: (req, callback) => {
        return db.query(`SELECT COUNT(dh_id) AS amount FROM donhang WHERE NOT dh_trangthai='DAHUY' AND NOT dh_trangthai='THANHCONG'`, callback)
    },

    getYearsFormOrders: (req, callback) => {
        return db.query(`SELECT YEAR(dh_ngaydathang) AS value, YEAR(dh_ngaydathang) AS label FROM donhang GROUP BY value ORDER BY value DESC`, callback)
    },

    getSalesOrdersForMonths: (req, callback) => {
        return db.query(`SELECT SUM(dh_thanhtoan) AS total FROM donhang WHERE YEAR(dh_ngaydathang)=${req.body.year}  AND dh_trangthai='THANHCONG' GROUP BY MONTH(dh_ngaydathang)`, callback)
    },

    getOrdersByAccount: (req, callback) => {
        return db.query(`SELECT *, date_format(DH.dh_ngaydathang, '%d/%m/%Y %H:%i') as dh_ngaydathang FROM donhang DH JOIN trangthaidonhang TTDH ON DH.dh_trangthai=TTDH.ttdh_id WHERE DH.dh_taikhoan='${req.body.account}' ORDER BY DH.dh_ngaydathang DESC`, callback)
    },

    getSalesMonthly: (req, callback) => {
        return db.query(`SELECT SUM(IF(MONTH(dh_ngaydathang) = 01, dh_thanhtoan, 0)) AS 'Jan', SUM(IF(MONTH(dh_ngaydathang) = 02, dh_thanhtoan, 0)) AS 'Feb',SUM(IF(MONTH(dh_ngaydathang) = 03,  dh_thanhtoan, 0)) AS 'Mar', SUM(IF(MONTH(dh_ngaydathang) = 04, dh_thanhtoan, 0)) AS 'Apr',  SUM(IF(MONTH(dh_ngaydathang) = 05, dh_thanhtoan, 0)) AS 'May', SUM(IF(MONTH(dh_ngaydathang) = 06, dh_thanhtoan, 0)) AS 'Jun', SUM(IF(MONTH(dh_ngaydathang) = 07, dh_thanhtoan, 0)) AS 'Jul', SUM(IF(MONTH(dh_ngaydathang) = 08, dh_thanhtoan, 0)) AS 'Aug',  SUM(IF(MONTH(dh_ngaydathang) = 09, dh_thanhtoan, 0)) AS 'Sep', SUM(IF(MONTH(dh_ngaydathang) = 10, dh_thanhtoan, 0)) AS 'Oct', SUM(IF(MONTH(dh_ngaydathang) = 11, dh_thanhtoan, 0)) AS 'Nov', SUM(IF(MONTH(dh_ngaydathang) = 12, dh_thanhtoan, 0)) AS 'Dec' FROM donhang WHERE YEAR(dh_ngaydathang)=${req.body.year} GROUP BY MONTH(dh_ngaydathang)`, callback)
    },



}

module.exports = Order;