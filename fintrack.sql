-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 07, 2024 at 08:14 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fintrack`
--

-- --------------------------------------------------------

--
-- Table structure for table `promocodes`
--

CREATE TABLE `promocodes` (
  `promoCodeId` int(11) NOT NULL,
  `promoCode` varchar(50) DEFAULT NULL,
  `store` varchar(100) DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `discount` decimal(5,2) DEFAULT NULL,
  `expiryDate` date DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promocodes`
--

INSERT INTO `promocodes` (`promoCodeId`, `promoCode`, `store`, `latitude`, `longitude`, `discount`, `expiryDate`, `category`) VALUES
(1, 'SAVE10', 'Harrods', 32.173298, 74.176573, 10.00, '2024-12-31', 'Luxury'),
(2, 'WELCOME20', 'Selfridges', 51.514500, -0.152700, 20.00, '2024-11-30', 'Fashion'),
(3, 'FALL15', 'Waterstones Piccadilly', 51.509100, -0.135700, 15.00, '2024-10-15', 'Books'),
(4, 'SUMMER25', 'Nike Town London', 51.514400, -0.147900, 25.00, '2024-09-30', 'Sportswear'),
(5, 'WINTER30', 'Hamleys', 51.512900, -0.140100, 30.00, '2024-12-01', 'Toys'),
(6, 'SPRING5', 'John Lewis Oxford Street', 51.515100, -0.142400, 5.00, '2024-05-01', 'Home & Garden'),
(7, 'AUTUMN40', 'Waitrose', 51.518300, -0.143700, 40.00, '2024-11-15', 'Groceries'),
(8, 'BLACKFRIDAY50', 'Currys PC World', 51.510700, -0.134900, 50.00, '2024-11-25', 'Electronics'),
(9, 'CYBERMONDAY15', 'Zara', 51.513300, -0.144600, 15.00, '2024-12-02', 'Fashion'),
(10, 'NEWYEAR10', 'Odeon Leicester Square', 51.510200, -0.130400, 10.00, '2025-01-01', 'Entertainment'),
(11, 'HALLOWEEN20', 'The Disney Store', 51.509500, -0.134300, 20.00, '2024-10-31', 'Toys'),
(12, 'EASTER25', 'Foyles Bookstore', 51.514500, -0.128000, 25.00, '2024-04-01', 'Books'),
(13, 'BACKTOSCHOOL10', 'Ryman Stationery', 51.517800, -0.128600, 10.00, '2024-09-01', 'Stationery'),
(14, 'VALENTINE15', 'Lush Oxford Street', 51.514100, -0.144500, 15.00, '2024-02-14', 'Cosmetics'),
(15, 'BOXINGDAY30', 'Marks & Spencer', 51.515500, -0.142700, 30.00, '2024-12-26', 'Home & Garden'),
(16, 'CHRISTMAS20', 'Sainsbury\'s', 51.512000, -0.123700, 20.00, '2024-12-25', 'Groceries'),
(17, 'SUMMERSALE25', 'Topshop Oxford Circus', 51.515400, -0.141000, 25.00, '2024-08-01', 'Fashion'),
(18, 'SPRINGFLING15', 'Apple Store Covent Garden', 51.512400, -0.122600, 15.00, '2024-03-21', 'Electronics'),
(19, 'HOLIDAY20', 'HMV Oxford Street', 51.515600, -0.138400, 20.00, '2024-07-04', 'Entertainment'),
(20, 'WINTERWARMER30', 'The Entertainer', 51.510500, -0.125400, 30.00, '2024-01-15', 'Toys'),
(21, 'FESTIVE50', 'Fortnum & Mason', 51.509400, -0.136700, 50.00, '2024-12-20', 'Luxury'),
(22, 'NYE15', 'Vue Cinema Westfield', 51.507400, -0.221900, 15.00, '2024-12-31', 'Entertainment'),
(23, 'SPRINGBLOOM10', 'The Conran Shop', 51.513600, -0.158500, 10.00, '2024-03-01', 'Home & Garden'),
(24, 'SUMMERFUN20', 'H&M Oxford Circus', 51.514300, -0.144400, 20.00, '2024-06-15', 'Fashion');

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `storeId` varchar(50) NOT NULL,
  `storeName` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `distance` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transactionId` varchar(10) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `merchant` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `IncomeAmount` decimal(10,2) DEFAULT NULL,
  `transactionTimestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`transactionId`, `userId`, `date`, `amount`, `merchant`, `category`, `IncomeAmount`, `transactionTimestamp`) VALUES
('T0001', 13, '2024-08-06', 2736.35, 'Company A', 'Salary', 2736.35, '2024-07-25 22:34:07'),
('T0002', 13, '2024-08-14', -120.63, 'RentPayment', 'Clothing', 0.00, '2024-07-21 22:34:07'),
('T0003', 13, '2024-08-07', -101.16, 'Walmart', 'Groceries', 0.00, '2024-08-11 22:34:07'),
('T0004', 13, '2024-08-22', -89.20, 'RentPayment', 'Clothing', 0.00, '2024-07-20 22:34:07'),
('T0005', 13, '2024-07-28', -282.64, 'Walmart', 'Groceries', 0.00, '2024-07-04 22:34:07'),
('T0006', 13, '2024-08-05', -263.59, 'RentPayment', 'Electronics', 0.00, '2024-07-12 22:34:07'),
('T0007', 13, '2024-08-31', -511.61, 'Amazon', 'Electronics', 0.00, '2024-07-28 22:34:07'),
('T0008', 13, '2024-08-10', -417.78, 'Best Buy', 'Groceries', 0.00, '2024-08-23 22:34:07'),
('T0009', 13, '2024-08-21', -354.58, 'Amazon', 'Groceries', 0.00, '2024-08-07 22:34:07'),
('T0010', 13, '2024-09-02', -348.74, 'Amazon', 'Groceries', 0.00, '2024-08-30 22:34:07'),
('T0011', 13, '2024-08-22', 2163.75, 'Company A', 'Salary', 2163.75, '2024-07-26 22:34:07'),
('T0012', 13, '2024-08-22', -577.67, 'RentPayment', 'Clothing', 0.00, '2024-08-04 22:34:07'),
('T0013', 13, '2024-08-23', -598.84, 'McDonald\'s', 'Clothing', 0.00, '2024-09-01 22:34:07'),
('T0014', 13, '2024-07-12', -53.78, 'Starbucks', 'Electronics', 0.00, '2024-07-05 22:34:07'),
('T0015', 13, '2024-08-20', -34.29, 'Target', 'Rent', 0.00, '2024-07-22 22:34:07'),
('T0016', 13, '2024-07-21', -241.97, 'McDonald\'s', 'Clothing', 0.00, '2024-07-23 22:34:07'),
('T0017', 13, '2024-07-13', -24.92, 'RentPayment', 'Food & Drink', 0.00, '2024-07-04 22:34:07'),
('T0018', 13, '2024-08-09', -200.75, 'RentPayment', 'Electronics', 0.00, '2024-07-22 22:34:07'),
('T0019', 13, '2024-07-30', -344.96, 'Starbucks', 'Groceries', 0.00, '2024-07-30 22:34:07'),
('T0020', 13, '2024-09-02', -108.52, 'McDonald\'s', 'Groceries', 0.00, '2024-08-17 22:34:07'),
('T0021', 13, '2024-08-04', 1574.09, 'Company A', 'Salary', 1574.09, '2024-07-25 22:34:07'),
('T0022', 13, '2024-07-05', -44.45, 'Starbucks', 'Electronics', 0.00, '2024-07-13 22:34:07'),
('T0023', 13, '2024-08-15', -457.31, 'Best Buy', 'Clothing', 0.00, '2024-08-29 22:34:07'),
('T0024', 13, '2024-09-01', -316.84, 'Starbucks', 'Clothing', 0.00, '2024-08-29 22:34:07'),
('T0025', 13, '2024-07-09', -441.50, 'Amazon', 'Rent', 0.00, '2024-08-14 22:34:07'),
('T0026', 13, '2024-07-04', -532.51, 'McDonald\'s', 'Electronics', 0.00, '2024-08-17 22:34:07'),
('T0027', 13, '2024-08-12', -352.32, 'Best Buy', 'Food & Drink', 0.00, '2024-09-01 22:34:07'),
('T0028', 13, '2024-07-18', -59.93, 'Amazon', 'Electronics', 0.00, '2024-08-31 22:34:07'),
('T0029', 13, '2024-07-22', -342.44, 'RentPayment', 'Electronics', 0.00, '2024-07-10 22:34:07'),
('T0030', 13, '2024-08-02', -251.27, 'McDonald\'s', 'Electronics', 0.00, '2024-08-27 22:34:07'),
('T0031', 13, '2024-07-04', 2098.99, 'Company A', 'Salary', 2098.99, '2024-08-12 22:34:07'),
('T0032', 13, '2024-08-16', -35.57, 'Starbucks', 'Rent', 0.00, '2024-07-13 22:34:07'),
('T0033', 13, '2024-07-06', -437.76, 'Starbucks', 'Food & Drink', 0.00, '2024-08-27 22:34:07'),
('T0034', 13, '2024-08-18', -42.38, 'Amazon', 'Food & Drink', 0.00, '2024-08-08 22:34:07'),
('T0035', 13, '2024-08-14', -169.39, 'Starbucks', 'Rent', 0.00, '2024-08-01 22:34:07'),
('T0036', 13, '2024-08-04', -90.73, 'Best Buy', 'Clothing', 0.00, '2024-07-18 22:34:07'),
('T0037', 13, '2024-08-11', -596.38, 'Best Buy', 'Clothing', 0.00, '2024-07-31 22:34:07'),
('T0038', 13, '2024-08-03', -90.70, 'Amazon', 'Clothing', 0.00, '2024-07-04 22:34:07'),
('T0039', 13, '2024-08-04', -506.87, 'McDonald\'s', 'Rent', 0.00, '2024-09-01 22:34:07'),
('T0040', 13, '2024-08-24', -529.75, 'Best Buy', 'Electronics', 0.00, '2024-08-02 22:34:07'),
('T0041', 13, '2024-08-01', 2084.18, 'Company A', 'Salary', 2084.18, '2024-08-21 22:34:07'),
('T0042', 13, '2024-08-23', -184.52, 'Best Buy', 'Food & Drink', 0.00, '2024-07-24 22:34:07'),
('T0043', 13, '2024-07-17', -281.99, 'Walmart', 'Food & Drink', 0.00, '2024-08-14 22:34:07'),
('T0044', 13, '2024-07-08', -134.35, 'RentPayment', 'Food & Drink', 0.00, '2024-07-06 22:34:07'),
('T0045', 13, '2024-07-10', -357.43, 'McDonald\'s', 'Food & Drink', 0.00, '2024-08-31 22:34:07'),
('T0046', 13, '2024-07-25', -298.41, 'McDonald\'s', 'Clothing', 0.00, '2024-08-08 22:34:07'),
('T0047', 13, '2024-07-10', -472.10, 'Starbucks', 'Clothing', 0.00, '2024-08-29 22:34:07'),
('T0048', 13, '2024-08-21', -267.86, 'Best Buy', 'Electronics', 0.00, '2024-08-05 22:34:07'),
('T0049', 13, '2024-08-02', -299.77, 'McDonald\'s', 'Groceries', 0.00, '2024-08-25 22:34:07'),
('T0050', 13, '2024-07-31', -63.58, 'Best Buy', 'Electronics', 0.00, '2024-08-02 22:34:07'),
('T0051', 13, '2024-08-12', 2953.66, 'Company A', 'Salary', 2953.66, '2024-07-08 22:34:07'),
('T0052', 13, '2024-08-30', -405.42, 'Starbucks', 'Clothing', 0.00, '2024-08-16 22:34:07'),
('T0053', 13, '2024-08-08', -78.77, 'McDonald\'s', 'Rent', 0.00, '2024-08-23 22:34:07'),
('T0054', 13, '2024-08-04', -168.23, 'Amazon', 'Food & Drink', 0.00, '2024-09-02 22:34:07'),
('T0055', 13, '2024-07-17', -299.29, 'RentPayment', 'Electronics', 0.00, '2024-07-10 22:34:07'),
('T0056', 13, '2024-07-12', -530.92, 'Amazon', 'Groceries', 0.00, '2024-07-16 22:34:07'),
('T0057', 13, '2024-08-31', -97.63, 'Best Buy', 'Food & Drink', 0.00, '2024-08-05 22:34:07'),
('T0058', 13, '2024-08-09', -186.30, 'Amazon', 'Groceries', 0.00, '2024-07-17 22:34:07'),
('T0059', 13, '2024-08-28', -199.21, 'Amazon', 'Clothing', 0.00, '2024-08-28 22:34:07'),
('T0060', 13, '2024-07-10', -24.21, 'Best Buy', 'Groceries', 0.00, '2024-08-02 22:34:07'),
('T0061', 14, '2024-07-24', 1948.21, 'Company B', 'Salary', 1948.21, '2024-09-02 22:34:07'),
('T0062', 14, '2024-07-27', -462.35, 'Walmart', 'Groceries', 0.00, '2024-08-13 22:34:07'),
('T0063', 14, '2024-07-09', -476.74, 'RentPayment', 'Clothing', 0.00, '2024-07-21 22:34:07'),
('T0064', 14, '2024-07-25', -282.34, 'Walmart', 'Electronics', 0.00, '2024-08-14 22:34:07'),
('T0065', 14, '2024-08-13', -489.43, 'Best Buy', 'Rent', 0.00, '2024-08-27 22:34:07'),
('T0066', 14, '2024-07-17', -423.04, 'Amazon', 'Clothing', 0.00, '2024-07-23 22:34:07'),
('T0067', 14, '2024-08-02', -408.92, 'Best Buy', 'Food & Drink', 0.00, '2024-08-14 22:34:07'),
('T0068', 14, '2024-07-15', -77.02, 'Walmart', 'Groceries', 0.00, '2024-07-05 22:34:07'),
('T0069', 14, '2024-07-29', -479.10, 'Starbucks', 'Food & Drink', 0.00, '2024-08-23 22:34:07'),
('T0070', 14, '2024-08-19', -572.63, 'McDonald\'s', 'Groceries', 0.00, '2024-07-20 22:34:07'),
('T0071', 14, '2024-08-06', 2712.97, 'Company B', 'Salary', 2712.97, '2024-07-30 22:34:07'),
('T0072', 14, '2024-07-14', -424.81, 'RentPayment', 'Food & Drink', 0.00, '2024-09-02 22:34:07'),
('T0073', 14, '2024-07-24', -432.04, 'Target', 'Groceries', 0.00, '2024-07-16 22:34:07'),
('T0074', 14, '2024-07-15', -120.81, 'Best Buy', 'Food & Drink', 0.00, '2024-08-22 22:34:07'),
('T0075', 14, '2024-07-19', -328.31, 'Amazon', 'Rent', 0.00, '2024-08-21 22:34:07'),
('T0076', 14, '2024-07-28', -269.65, 'Target', 'Electronics', 0.00, '2024-07-06 22:34:07'),
('T0077', 14, '2024-07-12', -215.55, 'Starbucks', 'Groceries', 0.00, '2024-07-27 22:34:07'),
('T0078', 14, '2024-08-25', -369.78, 'Target', 'Food & Drink', 0.00, '2024-07-12 22:34:07'),
('T0079', 14, '2024-08-27', -443.18, 'Amazon', 'Rent', 0.00, '2024-08-04 22:34:07'),
('T0080', 14, '2024-07-22', -67.68, 'Walmart', 'Rent', 0.00, '2024-08-24 22:34:07'),
('T0081', 14, '2024-07-13', 1890.19, 'Company B', 'Salary', 1890.19, '2024-08-24 22:34:07'),
('T0082', 14, '2024-07-26', -289.38, 'Starbucks', 'Clothing', 0.00, '2024-08-10 22:34:07'),
('T0083', 14, '2024-08-10', -225.25, 'Amazon', 'Rent', 0.00, '2024-08-12 22:34:07'),
('T0084', 14, '2024-07-04', -290.34, 'Target', 'Clothing', 0.00, '2024-08-20 22:34:07'),
('T0085', 14, '2024-07-04', -78.72, 'Starbucks', 'Food & Drink', 0.00, '2024-08-03 22:34:07'),
('T0086', 14, '2024-08-08', -167.92, 'Best Buy', 'Food & Drink', 0.00, '2024-08-26 22:34:07'),
('T0087', 14, '2024-08-03', -329.89, 'RentPayment', 'Food & Drink', 0.00, '2024-08-10 22:34:07'),
('T0088', 14, '2024-08-02', -300.89, 'McDonald\'s', 'Clothing', 0.00, '2024-07-10 22:34:07'),
('T0089', 14, '2024-07-25', -173.63, 'RentPayment', 'Electronics', 0.00, '2024-08-25 22:34:07'),
('T0090', 14, '2024-07-05', -90.91, 'Best Buy', 'Food & Drink', 0.00, '2024-07-27 22:34:07'),
('T0091', 14, '2024-08-07', 2960.96, 'Company B', 'Salary', 2960.96, '2024-07-13 22:34:07'),
('T0092', 14, '2024-08-12', -542.23, 'Amazon', 'Food & Drink', 0.00, '2024-07-05 22:34:07'),
('T0093', 14, '2024-07-20', -484.19, 'Walmart', 'Electronics', 0.00, '2024-08-27 22:34:07'),
('T0094', 14, '2024-08-27', -304.64, 'McDonald\'s', 'Food & Drink', 0.00, '2024-07-08 22:34:07'),
('T0095', 14, '2024-07-15', -475.33, 'RentPayment', 'Clothing', 0.00, '2024-08-02 22:34:07'),
('T0096', 14, '2024-08-16', -443.48, 'RentPayment', 'Electronics', 0.00, '2024-07-10 22:34:07'),
('T0097', 14, '2024-09-01', -275.97, 'Amazon', 'Rent', 0.00, '2024-08-19 22:34:07'),
('T0098', 14, '2024-07-24', -430.88, 'Target', 'Electronics', 0.00, '2024-07-07 22:34:07'),
('T0099', 14, '2024-07-08', -465.31, 'Target', 'Rent', 0.00, '2024-07-16 22:34:07'),
('T0100', 14, '2024-07-16', -461.84, 'Target', 'Clothing', 0.00, '2024-07-21 22:34:07'),
('T0101', 14, '2024-08-30', 1820.65, 'Company B', 'Salary', 1820.65, '2024-07-13 22:34:07'),
('T0102', 14, '2024-07-20', -264.05, 'Target', 'Clothing', 0.00, '2024-08-09 22:34:07'),
('T0103', 14, '2024-07-25', -444.68, 'Walmart', 'Food & Drink', 0.00, '2024-07-09 22:34:07'),
('T0104', 14, '2024-07-21', -261.82, 'McDonald\'s', 'Food & Drink', 0.00, '2024-07-16 22:34:07'),
('T0105', 14, '2024-07-24', -439.88, 'Amazon', 'Electronics', 0.00, '2024-07-28 22:34:07'),
('T0106', 14, '2024-08-10', -85.40, 'McDonald\'s', 'Rent', 0.00, '2024-08-02 22:34:07'),
('T0107', 14, '2024-08-29', -27.50, 'RentPayment', 'Groceries', 0.00, '2024-08-24 22:34:07'),
('T0108', 14, '2024-08-18', -160.63, 'RentPayment', 'Clothing', 0.00, '2024-09-02 22:34:07'),
('T0109', 14, '2024-08-21', -487.30, 'Walmart', 'Electronics', 0.00, '2024-08-26 22:34:07'),
('T0110', 14, '2024-07-11', -238.21, 'RentPayment', 'Rent', 0.00, '2024-07-25 22:34:07'),
('T0111', 14, '2024-08-24', 1996.17, 'Company B', 'Salary', 1996.17, '2024-08-18 22:34:07'),
('T0112', 14, '2024-08-06', -283.93, 'Amazon', 'Food & Drink', 0.00, '2024-07-06 22:34:07'),
('T0113', 14, '2024-08-05', -389.79, 'RentPayment', 'Food & Drink', 0.00, '2024-07-15 22:34:07'),
('T0114', 14, '2024-07-20', -531.12, 'Target', 'Rent', 0.00, '2024-09-01 22:34:07'),
('T0115', 14, '2024-08-10', -53.50, 'Amazon', 'Groceries', 0.00, '2024-07-07 22:34:07'),
('T0116', 14, '2024-08-04', -312.78, 'Amazon', 'Rent', 0.00, '2024-07-26 22:34:07'),
('T0117', 14, '2024-07-12', -380.30, 'Best Buy', 'Groceries', 0.00, '2024-07-06 22:34:07'),
('T0118', 14, '2024-08-03', -334.09, 'Walmart', 'Food & Drink', 0.00, '2024-08-01 22:34:07'),
('T0119', 14, '2024-07-26', -104.63, 'Walmart', 'Food & Drink', 0.00, '2024-08-20 22:34:07'),
('T0120', 14, '2024-08-11', -316.33, 'Amazon', 'Rent', 0.00, '2024-08-09 22:34:07'),
('T0004', 13, '2024-09-06', -55.80, 'Starbucks', 'Dining', 0.00, '2024-08-08 15:12:45'),
('T0005', 13, '2024-09-06', -45.00, 'Netflix', 'Subscription', 0.00, '2024-08-10 18:25:22'),
('T0006', 13, '2024-09-06', -75.32, 'Amazon', 'Electronics', 0.00, '2024-08-12 20:14:56'),
('T0007', 14, '2024-09-06', 1500.00, 'Company B', 'Salary', 1500.00, '2024-08-13 09:00:00'),
('T0008', 14, '2024-09-06', -200.50, 'Apple Store', 'Electronics', 0.00, '2024-08-14 14:45:12'),
('T0009', 14, '2024-09-06', -89.99, 'Uber', 'Transport', 0.00, '2024-08-16 12:30:45'),
(NULL, 15, '2024-09-06', 400.75, 'ABC', 'Shopping', 1000.00, '2024-09-06 14:30:00'),
(NULL, 15, '2024-09-06', -400.75, 'ABC', 'Shopping', 1000.00, '2024-09-06 14:30:00'),
('T0004', 13, '2024-09-07', -55.80, 'Starbucks', 'Dining', 0.00, '2024-08-08 15:12:45'),
('T0005', 13, '2024-09-07', -45.00, 'Netflix', 'Subscription', 0.00, '2024-08-10 18:25:22'),
('T0006', 13, '2024-09-07', -75.32, 'Amazon', 'Electronics', 0.00, '2024-08-12 20:14:56');

-- --------------------------------------------------------

--
-- Table structure for table `userpreferences`
--

CREATE TABLE `userpreferences` (
  `preferenceId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `preferenceType` varchar(50) DEFAULT NULL,
  `preferenceValue` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `verificationCode` varchar(4) DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `email`, `passwordHash`, `firstName`, `lastName`, `createdAt`, `updatedAt`, `verificationCode`, `isVerified`) VALUES
(13, 'mail@mail.com', '$2b$10$u2AEd8dn31MWURMijunZ4ezKSa/3ysfuLqU8EOWE8L7sXcDLB5Ml6', 'Muhammad', 'Hassan', '2024-09-02 21:26:17', '2024-09-02 21:27:29', NULL, 1),
(14, 'test@mail.com', '$2b$10$nQt44XSXbQVxx2aUiUYdfeGwMZ5MJ4oAUnoCjOeVyWKXi4UsZq45.', 'Mark', 'Henry', '2024-09-02 22:23:54', '2024-09-02 22:24:19', NULL, 1),

--
-- Indexes for dumped tables
--

--
-- Indexes for table `promocodes`
--
ALTER TABLE `promocodes`
  ADD PRIMARY KEY (`promoCodeId`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`storeId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `userpreferences`
--
ALTER TABLE `userpreferences`
  ADD PRIMARY KEY (`preferenceId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `userpreferences`
--
ALTER TABLE `userpreferences`
  MODIFY `preferenceId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `stores_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE;

--
-- Constraints for table `userpreferences`
--
ALTER TABLE `userpreferences`
  ADD CONSTRAINT `userpreferences_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
