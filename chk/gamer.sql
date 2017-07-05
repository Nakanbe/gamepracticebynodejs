-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2017-07-05 11:42:00
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
-- 資料表結構 `gamer`
--

CREATE TABLE `gamer` (
  `id` bigint(20) NOT NULL COMMENT '序號',
  `webid` int(4) NOT NULL COMMENT '網站序號',
  `web_game_id` bigint(15) NOT NULL COMMENT '網站賽事編號',
  `ms` char(3) NOT NULL COMMENT '上下半場等',
  `gtype` varchar(3) DEFAULT NULL,
  `strong` char(1) NOT NULL COMMENT '強弱',
  `runball` char(1) NOT NULL DEFAULT 'N' COMMENT '滾球開啟',
  `game_id` int(10) NOT NULL COMMENT 'game.id',
  `close` char(1) NOT NULL DEFAULT 'N' COMMENT '關閉旗標',
  `insert_dt` datetime NOT NULL COMMENT '新增時間',
  `num_h` varchar(10) DEFAULT NULL COMMENT '主隊號碼',
  `num_c` varchar(10) DEFAULT NULL COMMENT '客隊號碼',
  `home_s` int(11) DEFAULT NULL COMMENT '主隊比分',
  `cust_s` int(11) DEFAULT NULL COMMENT '客隊比分',
  `update_dt` datetime DEFAULT NULL COMMENT '最後變更時間',
  `start_dt` varchar(10) DEFAULT NULL COMMENT '開賽日期',
  `start_time` varchar(10) DEFAULT NULL COMMENT '開賽時間',
  `RB_Start` char(1) NOT NULL COMMENT 'RunBall Start flag',
  `RBHomeScore` varchar(5) DEFAULT NULL COMMENT '滾球即時比分(Home)',
  `RBCustScore` varchar(5) DEFAULT NULL COMMENT '滾球即時比分(Cust)',
  `memo` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'memo',
  `statsInfo` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'static url',
  `redcard` varchar(10) DEFAULT NULL COMMENT '紅牌',
  `old_game_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='賽事對應';

--
-- 資料表的匯出資料 `gamer`
--

INSERT INTO `gamer` (`id`, `webid`, `web_game_id`, `ms`, `gtype`, `strong`, `runball`, `game_id`, `close`, `insert_dt`, `num_h`, `num_c`, `home_s`, `cust_s`, `update_dt`, `start_dt`, `start_time`, `RB_Start`, `RBHomeScore`, `RBCustScore`, `memo`, `statsInfo`, `redcard`, `old_game_id`) VALUES
(1, 1, 23, 'UP', 'BS', 'S', 'N', 1, 'N', '2017-07-04 00:00:00', NULL, NULL, 1, -1, NULL, '2017-07-01', '00:00:00', '1', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 1, 24, 'UP', 'BS', 'S', 'N', 2, 'N', '2017-07-04 00:01:00', NULL, NULL, NULL, 1, NULL, '2017-07-08', '00:00:30', '1', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 1, 26, 'UP', 'BS', 'S', 'N', 3, 'N', '2017-07-04 00:01:00', NULL, NULL, -2, 0, NULL, '2017-07-08', '00:01:00', '1', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 2, 27, 'UP', 'BS', 'S', 'N', 4, 'N', '2017-07-04 00:01:00', NULL, NULL, 0, 2, NULL, '2017-07-08', '00:01:30', '1', NULL, NULL, NULL, NULL, NULL, NULL),
(5, 2, 45, 'UP', 'BS', 'S', 'N', 5, 'N', '2017-07-03 00:00:00', NULL, NULL, 1, 2, NULL, '2017-07-01', '00:02:00', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 2, 46, 'UP', 'BS', 'S', 'N', 6, 'N', '2017-07-03 00:00:00', NULL, NULL, 1, 0, NULL, '2017-07-08', '00:02:30', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(7, 3, 8, 'UP', 'BS', 'S', 'N', 7, 'N', '2017-07-04 00:00:00', NULL, NULL, -2, 4, NULL, '2017-07-08', '00:03:00', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(8, 3, 7, 'UP', 'BS', 'S', 'N', 8, 'N', '2017-07-04 00:00:00', NULL, NULL, 3, 0, '2017-07-08 00:00:00', '2017-07-08', '00:03:30', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(9, 1, 456, 'UP', 'FT', 'S', 'N', 9, 'N', '2017-07-04 00:00:00', NULL, NULL, 0, 0, '2017-07-04 00:00:00', '2017-07-11', '00:04:30', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(10, 2, 58, 'UP', 'FT', 'S', 'N', 10, 'N', '2017-07-05 00:00:00', NULL, NULL, 3, 2, NULL, '2017-07-08', '00:04:30', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(11, 5, 565, 'UP', 'FT', 'S', 'N', 11, 'N', '2017-07-02 00:00:00', NULL, NULL, 1, 2, NULL, '2017-07-15', '00:04:00', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(12, 6, 468, 'UP', 'FT', 'S', 'N', 12, 'N', '2017-07-06 00:00:00', NULL, NULL, -2, 0, NULL, '2017-07-15', '00:04:30', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(13, 1, 456, 'UP', 'BS', 'S', 'N', 13, 'N', '2017-07-05 00:00:00', NULL, NULL, 1, 2, NULL, '2017-07-05', '08:30:00', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(14, 1, 462, 'UP', 'BS', 'S', 'N', 14, 'N', '2017-07-04 00:00:00', NULL, NULL, 4, 3, NULL, '2017-07-05', '09:00:00', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(15, 1, 458, 'UP', 'BS', 'S', 'N', 15, 'N', '2017-07-01 00:00:00', NULL, NULL, 0, 1, NULL, '2017-07-05', '09:30:00', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(16, 1, 66, 'UP', 'BS', 'S', 'N', 16, 'N', '2017-07-02 00:00:00', NULL, NULL, 1, 2, NULL, '2017-07-05', '11:00:00', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(17, 2, 4510, 'UP', 'BS', 'S', 'N', 17, 'N', '2017-07-05 00:00:00', '', NULL, 1, 3, NULL, '2017-07-05', '14:00:00', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(18, 2, 465, 'UP', 'BS', 'S', 'N', 18, 'N', '2017-07-05 00:00:00', NULL, NULL, 0, 2, NULL, '2017-07-05', '16:00:00', 'S', NULL, NULL, NULL, NULL, NULL, NULL);

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `gamer`
--
ALTER TABLE `gamer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gamer_unique` (`webid`,`game_id`,`web_game_id`,`ms`),
  ADD KEY `game_id` (`game_id`),
  ADD KEY `webid` (`webid`,`web_game_id`,`ms`),
  ADD KEY `gtype` (`start_dt`,`start_time`),
  ADD KEY `game_id_2` (`game_id`,`ms`,`webid`),
  ADD KEY `gtype_idx` (`gtype`,`game_id`,`ms`,`webid`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `gamer`
--
ALTER TABLE `gamer`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '序號', AUTO_INCREMENT=19;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
