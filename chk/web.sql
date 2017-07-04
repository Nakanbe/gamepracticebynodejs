-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2017-07-04 12:23:19
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
-- 資料表結構 `web`
--

CREATE TABLE `web` (
  `id` tinyint(4) UNSIGNED NOT NULL COMMENT '網站序號',
  `name` varchar(20) NOT NULL COMMENT '網站名稱',
  `addr` varchar(50) NOT NULL DEFAULT ' ' COMMENT '網址',
  `insert_dt` datetime DEFAULT NULL COMMENT 'insert date',
  `memo` varchar(1000) DEFAULT NULL,
  `enable` varchar(1) CHARACTER SET latin1 NOT NULL COMMENT '啟用'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `web`
--

INSERT INTO `web` (`id`, `name`, `addr`, `insert_dt`, `memo`, `enable`) VALUES
(1, 'sportslottery', ' https://www.sportslottery.com.tw/', NULL, NULL, ''),
(2, 'jingcai', ' http://www.kufa88.com/Promotion/jingcai', NULL, NULL, ''),
(3, '7sport', '7sport.com', NULL, NULL, ''),
(4, '8betsport', '8-bet-sport.com', NULL, NULL, ''),
(5, 'foot-bet-9', ' foot-bet-9.com', NULL, NULL, ''),
(6, 'foot-bet-10', ' foot-bet-10.com', NULL, NULL, ''),
(7, 'bedminton-11', ' bedminton-11.com', NULL, NULL, ''),
(8, 'bedminton-12', ' bedminton-12.com', NULL, NULL, '');

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `web`
--
ALTER TABLE `web`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `web_idx1` (`name`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `web`
--
ALTER TABLE `web`
  MODIFY `id` tinyint(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '網站序號', AUTO_INCREMENT=9;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
