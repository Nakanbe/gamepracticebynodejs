-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2017-07-04 12:23:08
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
-- 資料表結構 `league`
--

CREATE TABLE `league` (
  `id` int(11) NOT NULL COMMENT '聯盟id',
  `game_type` varchar(5) CHARACTER SET latin1 NOT NULL COMMENT '聯盟球種',
  `name_e` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '聯盟名稱英文',
  `name_c` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '聯盟名稱中文',
  `name_g` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '聯盟名稱簡體',
  `name_j` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `sname_e` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '聯盟名稱英文簡稱',
  `sname_c` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '聯盟名稱中文簡稱',
  `sname_g` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '聯盟名稱簡體簡稱',
  `sname_j` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `insert_dt` datetime DEFAULT NULL,
  `alias` int(11) NOT NULL DEFAULT '0',
  `sortid` varchar(3) CHARACTER SET latin1 NOT NULL DEFAULT ' ',
  `groupid` int(11) NOT NULL DEFAULT '0',
  `web_id` int(11) NOT NULL DEFAULT '0',
  `league_open` char(1) NOT NULL DEFAULT 'D',
  `update_dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='聯盟資料';

--
-- 資料表的匯出資料 `league`
--

INSERT INTO `league` (`id`, `game_type`, `name_e`, `name_c`, `name_g`, `name_j`, `sname_e`, `sname_c`, `sname_g`, `sname_j`, `insert_dt`, `alias`, `sortid`, `groupid`, `web_id`, `league_open`, `update_dt`) VALUES
(1, 'BS', 'national', '國家聯盟', '國家聯盟', NULL, 'N', '國聯', '國聯', NULL, NULL, 0, ' ', 0, 0, 'D', '2017-07-03 00:57:21'),
(2, 'BS', 'america', '美國聯盟', '美國聯盟', NULL, 'A', '美聯', '美聯', NULL, NULL, 0, ' ', 0, 0, 'D', '2017-07-03 00:57:21'),
(3, 'FT', 'germany', '德國甲級聯賽', '德國甲級聯賽', NULL, 'G', '德甲', '德甲', NULL, NULL, 0, ' ', 0, 0, 'D', '2017-07-03 01:05:29'),
(4, 'FT', 'spanish', '西班牙甲級聯賽', '西班牙甲級聯賽', NULL, 'S', '西甲', '西甲', NULL, NULL, 0, ' ', 0, 0, 'D', '2017-07-03 01:05:58'),
(5, 'BM', 'Taipei', '台北聯賽', '台北聯賽', NULL, 'TP', '北聯', '北聯', NULL, NULL, 0, ' ', 0, 0, 'D', '2017-07-03 01:07:42'),
(6, 'BM', 'Taichung', '台中聯賽', '台中聯賽', NULL, 'TC', '中聯', '中聯', NULL, NULL, 0, ' ', 0, 0, 'D', '2017-07-03 01:07:42');

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `league`
--
ALTER TABLE `league`
  ADD PRIMARY KEY (`id`),
  ADD KEY `league_idx1` (`web_id`,`game_type`),
  ADD KEY `alias` (`alias`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `league`
--
ALTER TABLE `league`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '聯盟id', AUTO_INCREMENT=7;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
