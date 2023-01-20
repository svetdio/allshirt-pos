-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2023 at 02:34 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.0.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+08:00";

--
-- Database: `allshirt_pos`
--
DROP DATABASE allshirt_pos;

CREATE DATABASE IF NOT EXISTS `allshirt_pos` ;

USE `allshirt_pos`;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE IF NOT EXISTS `employee` (
  `emp_id` int(11) NOT NULL,
  `emp_fname` varchar(100) DEFAULT NULL,
  `emp_lname` varchar(100) DEFAULT NULL,
  `emp_username` varchar(100) DEFAULT NULL,
  `emp_password` varchar(100) DEFAULT NULL,
  `isBranchHead` smallint(6) DEFAULT NULL,
   PRIMARY KEY (`emp_id`)
) ENGINE=InnoDB;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`emp_id`, `emp_fname`, `emp_lname`, `emp_username`, `emp_password`, `isBranchHead`) VALUES
(101, 'Branch', 'Head', 'branchhead', 'Branchhead123!', 1),
(102, 'Employee', 'Cashier', 'employee', 'Employee123!', 0);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE IF NOT EXISTS `items` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `item_desc` text NOT NULL,
  `price` float NOT NULL,
  `date_added` datetime NOT NULL DEFAULT current_timestamp(),
  `last_updated` datetime NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `item_name`, `image`, `item_desc`, `price`, `date_added`, `last_updated`) VALUES
(1, 'Polo Shirt Black', 'img/ps-black.png', 'Polo Shirt Black', 250, '2022-12-01 15:57:54', '0000-00-00 00:00:00'),
(2, 'Polo Shirt Blue', 'img/ps-blue.png', 'Polo Shirt Blue', 250, '2022-12-01 15:57:54', '0000-00-00 00:00:00'),
(3, 'Polo Shirt Brown', 'img/ps-brown.png', 'Polo Shirt Brown', 250, '2022-12-01 15:57:54', '0000-00-00 00:00:00'),
(4, 'Polo Shirt Pink', 'img/ps-pink.png', 'Polo Shirt Pink', 250, '2022-12-01 15:57:54', '0000-00-00 00:00:00'),
(5, 'Polo Shirt Red', 'img/ps-red.png', 'Polo Shirt Red', 250, '2022-12-01 15:57:54', '0000-00-00 00:00:00'),
(6, 'Polo Shirt Violet', 'img/ps-violet.png', 'Polo Shirt Violet', 250, '2022-12-01 15:57:54', '0000-00-00 00:00:00'),
(7, 'Polo Shirt White', 'img/ps-white.png', 'Polo Shirt White', 250, '2022-12-01 15:57:54', '0000-00-00 00:00:00'),
(8, 'Round Shirt Black', 'img/rn-black.png', 'Round Shirt Black', 200, '2022-12-01 15:57:54', '0000-00-00 00:00:00'),
(9, 'Round Shirt Blue', 'img/rn-blue.png', 'Round Shirt Blue', 200, '2022-12-01 15:57:54', '0000-00-00 00:00:00'),
(10, 'Round Shirt Green', 'img/rn-green.png', 'Round Shirt Green', 200, '2022-12-01 15:57:55', '0000-00-00 00:00:00'),
(11, 'Round Shirt Orange', 'img/rn-orange.png', 'Round Shirt Orange', 200, '2022-12-01 15:57:55', '0000-00-00 00:00:00'),
(12, 'Round Shirt Red', 'img/rn-red.png', 'Round Shirt Red', 200, '2022-12-01 15:57:55', '0000-00-00 00:00:00'),
(13, 'Round Shirt White', 'img/rn-white.png', 'Round Shirt White', 200, '2022-12-01 15:57:55', '0000-00-00 00:00:00'),
(14, 'Round Shirt Yellow', 'img/rn-yellow.png', 'Round Shirt Yellow', 170, '2022-12-01 15:57:55', '0000-00-00 00:00:00'),
(15, 'V-neck Black', 'img/vn-black.png', 'V-neck Black', 200, '2022-12-01 15:57:55', '0000-00-00 00:00:00'),
(16, 'V-neck Blue', 'img/vn-blue.png', 'V-neck Blue', 200, '2022-12-01 15:57:55', '0000-00-00 00:00:00'),
(17, 'V-neck Green', 'img/vn-green.png', 'V-neck Green', 200, '2022-12-01 15:57:55', '0000-00-00 00:00:00'),
(18, 'V-neck Orange', 'img/vn-orange.png', 'V-neck Orange', 200, '2022-12-01 15:57:55', '0000-00-00 00:00:00'),
(19, 'V-neck Red', 'img/vn-red.png', 'V-neck Red', 200, '2022-12-01 15:57:55', '0000-00-00 00:00:00'),
(20, 'V-neck Violet', 'img/vn-violet.png', 'V-neck Violet', 200, '2022-12-01 15:57:55', '0000-00-00 00:00:00'),
(21, 'V-neck White', 'img/vn-white.png', 'V-neck White', 200, '2022-12-01 15:57:55', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `items_list`
--

CREATE TABLE IF NOT EXISTS `items_list` (
  `items_id` int(11) NOT NULL,
  `total_item_qty` int(11) NOT NULL,
  `discount` FLOAT NOT NULL,
  `tax_rate` FLOAT NOT NULL,
  KEY `fk_item_id` (`items_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items_list`
--

INSERT INTO `items_list` (`items_id`, `total_item_qty`, `discount`, `tax_rate`) VALUES
(1, 10, 0, 12),
(2, 10, 0, 12),
(3, 10, 0, 12),
(4, 10, 0, 12),
(5, 10, 0, 12),
(6, 10, 0, 12),
(7, 10, 0, 12),
(8, 10, 0, 12),
(9, 10, 0, 12),
(10, 10, 0, 12),
(11, 10, 0, 12),
(12, 10, 0, 12),
(13, 10, 0, 12),
(14, 10, 0, 12),
(15, 10, 0, 12),
(16, 10, 0, 12),
(17, 10, 0, 12),
(18, 10, 0, 12),
(19, 10, 0, 12),
(20, 10, 0, 12),
(21, 10, 0, 12)
;
--
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_id` int(11) NOT NULL,
  `paid_amt` FLOAT NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_emp` (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders_detail`
--

CREATE TABLE IF NOT EXISTS `orders_detail` (
  `orders_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `price` float NOT NULL,
  `discount` FLOAT NOT NULL,
  `tax_rate` FLOAT NOT NULL,
  `item_id` int(11) NOT NULL,
  `order_qty` int(11) NOT NULL,
  `transaction_date` datetime NOT NULL,
  PRIMARY KEY (`orders_detail_id`),
  KEY `fk_od_orders` (`order_id`),
  KEY `fk_item_ord` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders_detail`
--
--
-- Constraints for dumped tables
--

--
-- Constraints for table `items_list`
--
ALTER TABLE `items_list`
  ADD CONSTRAINT `fk_item_id` FOREIGN KEY (`items_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_emp` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders_detail`
--
ALTER TABLE `orders_detail`
  ADD CONSTRAINT `fk_item_ord` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_od_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
