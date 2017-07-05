-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2017-07-05 11:41:56
-- 伺服器版本: 10.1.22-MariaDB
-- PHP 版本： 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `t1`
--

-- --------------------------------------------------------

--
-- 資料表結構 `game`
--

CREATE TABLE `game` (
  `id` bigint(20) NOT NULL COMMENT '賽事id',
  `league_id` int(11) NOT NULL COMMENT '聯盟',
  `game_type` varchar(5) CHARACTER SET latin1 NOT NULL COMMENT '球種',
  `home_team` int(11) NOT NULL COMMENT '主隊',
  `cust_team` int(11) NOT NULL COMMENT '客隊',
  `start_dt` date NOT NULL COMMENT '開賽日',
  `start_time` time NOT NULL COMMENT '開賽時間',
  `insert_dt` datetime NOT NULL COMMENT '新增時間',
  `update_dt` datetime DEFAULT NULL COMMENT '最後變更時間',
  `new_id` bigint(20) DEFAULT NULL,
  `swap` char(1) NOT NULL DEFAULT 'N'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='賽是列表';

--
-- 資料表的匯出資料 `game`
--

INSERT INTO `game` (`id`, `league_id`, `game_type`, `home_team`, `cust_team`, `start_dt`, `start_time`, `insert_dt`, `update_dt`, `new_id`, `swap`) VALUES
(1, 1, 'BS', 1, 2, '2017-07-01', '00:00:00', '2017-07-01 00:00:00', '2017-07-01 00:00:00', NULL, 'N'),
(2, 1, 'BS', 1, 3, '2017-07-08', '00:30:00', '2017-07-08 00:30:00', '2017-07-08 00:30:00', NULL, 'N'),
(3, 1, 'BS', 3, 1, '2017-07-08', '00:01:00', '2017-07-08 00:01:00', '2017-07-08 00:01:00', NULL, 'N'),
(4, 1, 'BS', 4, 2, '2017-07-08', '00:01:30', '2017-07-08 00:01:30', '2017-07-08 00:01:30', NULL, 'N'),
(5, 2, 'BS', 5, 6, '2017-07-01', '00:02:00', '2017-07-01 00:02:00', '2017-07-01 00:02:00', NULL, 'N'),
(6, 2, 'BS', 5, 7, '2017-07-08', '00:02:30', '2017-07-08 00:02:30', '2017-07-08 00:02:30', NULL, 'N'),
(7, 2, 'BS', 5, 8, '2017-07-08', '00:03:00', '2017-07-08 00:03:00', '2017-07-08 00:03:00', NULL, 'N'),
(8, 2, 'BS', 8, 7, '2017-07-08', '00:03:30', '2017-07-08 00:03:30', '2017-07-08 00:03:30', NULL, 'N'),
(9, 3, 'FT', 9, 10, '2017-07-11', '00:04:00', '2017-07-01 00:04:00', '2017-07-01 00:04:00', NULL, 'N'),
(10, 3, 'FT', 12, 11, '2017-07-08', '00:04:30', '2017-07-08 00:04:30', '2017-07-08 00:04:30', NULL, 'N'),
(11, 3, 'FT', 10, 12, '2017-07-15', '00:04:00', '2017-07-15 00:04:00', '2017-07-15 00:04:00', NULL, 'N'),
(12, 3, 'FT', 9, 11, '2017-07-15', '00:04:30', '2017-07-15 00:04:30', '2017-07-15 00:04:30', NULL, 'N'),
(13, 1, 'BS', 4, 1, '2017-07-05', '08:30:00', '2017-07-05 00:00:00', NULL, NULL, 'N'),
(14, 1, 'BS', 4, 3, '2017-07-05', '09:00:00', '2017-07-04 00:00:00', NULL, NULL, 'N'),
(15, 1, 'BS', 2, 1, '2017-07-05', '09:30:00', '2017-07-04 00:00:00', NULL, NULL, 'N'),
(16, 1, 'BS', 2, 4, '2017-07-05', '11:00:00', '2017-07-04 00:00:00', NULL, NULL, 'N'),
(17, 2, 'BS', 5, 8, '2017-07-05', '14:00:00', '2017-07-05 00:00:00', NULL, NULL, 'N'),
(18, 2, 'BS', 7, 6, '2017-07-05', '16:00:00', '2017-07-05 00:00:00', NULL, NULL, 'N');

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `league_id` (`game_type`,`home_team`,`cust_team`,`start_dt`,`start_time`,`league_id`),
  ADD KEY `game_type` (`game_type`),
  ADD KEY `league_id_2` (`league_id`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `game`
--
ALTER TABLE `game`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '賽事id', AUTO_INCREMENT=19;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
