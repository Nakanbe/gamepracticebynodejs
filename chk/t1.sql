-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2017-07-07 12:19:14
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
-- 資料表結構 `chksetresult`
--

CREATE TABLE `chksetresult` (
  `game_id` int(11) NOT NULL COMMENT '賽事編號',
  `lasttime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最後更新時間'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `chksetresult`
--

INSERT INTO `chksetresult` (`game_id`, `lasttime`) VALUES
(66666, '2017-07-07 08:15:31'),
(55545, '2017-07-07 08:15:37'),
(11111, '2017-07-07 08:15:42');

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
(13, 1, 'BS', 4, 1, '2017-07-12', '08:30:00', '2017-07-05 00:00:00', NULL, NULL, 'N'),
(14, 1, 'BS', 4, 3, '2017-07-12', '09:00:00', '2017-07-04 00:00:00', NULL, NULL, 'N'),
(15, 1, 'BS', 2, 1, '2017-07-12', '09:30:00', '2017-07-04 00:00:00', NULL, NULL, 'N'),
(16, 1, 'BS', 2, 4, '2017-07-12', '11:00:00', '2017-07-04 00:00:00', NULL, NULL, 'N'),
(17, 2, 'BS', 5, 8, '2017-07-12', '14:00:00', '2017-07-05 00:00:00', NULL, NULL, 'N'),
(18, 2, 'BS', 7, 6, '2017-07-12', '16:00:00', '2017-07-05 00:00:00', NULL, NULL, 'N');

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
(13, 1, 456, 'UP', 'BS', 'S', 'N', 13, 'N', '2017-07-05 00:00:00', NULL, NULL, 1, 2, NULL, '2017-07-12', '08:30:00', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(14, 1, 462, 'UP', 'BS', 'S', 'N', 14, 'N', '2017-07-04 00:00:00', NULL, NULL, 4, 3, NULL, '2017-07-12', '09:00:00', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(15, 1, 458, 'UP', 'BS', 'S', 'N', 15, 'N', '2017-07-01 00:00:00', NULL, NULL, 0, 1, NULL, '2017-07-12', '09:30:00', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(16, 1, 66, 'UP', 'BS', 'S', 'N', 16, 'N', '2017-07-02 00:00:00', NULL, NULL, 1, 2, NULL, '2017-07-12', '11:00:00', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(17, 2, 4510, 'UP', 'BS', 'S', 'N', 17, 'N', '2017-07-05 00:00:00', '', NULL, 1, 3, NULL, '2017-07-12', '14:00:00', 'S', NULL, NULL, NULL, NULL, NULL, NULL),
(18, 2, 465, 'UP', 'BS', 'S', 'N', 18, 'N', '2017-07-05 00:00:00', NULL, NULL, 0, 2, NULL, '2017-07-12', '16:00:00', 'S', NULL, NULL, NULL, NULL, NULL, NULL);

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

-- --------------------------------------------------------

--
-- 資料表結構 `team`
--

CREATE TABLE `team` (
  `id` int(11) NOT NULL COMMENT '隊伍id',
  `league_id` int(11) NOT NULL COMMENT '聯盟id',
  `game_type` varchar(5) CHARACTER SET latin1 NOT NULL COMMENT '球種',
  `name_e` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT ' ' COMMENT '隊伍英文名稱',
  `name_c` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT ' ' COMMENT '隊伍繁體',
  `name_g` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT ' ' COMMENT '隊名簡體',
  `name_j` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT ' ',
  `sname_e` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT ' ' COMMENT '隊名英文簡稱',
  `sname_c` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT ' ' COMMENT '隊名繁體簡稱',
  `sname_g` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT ' ' COMMENT '對名簡體簡稱',
  `sname_j` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT ' ',
  `insert_dt` datetime DEFAULT NULL,
  `alias` int(11) NOT NULL DEFAULT '0',
  `sortid` varchar(3) CHARACTER SET latin1 NOT NULL DEFAULT ' ',
  `web_id` int(11) NOT NULL DEFAULT '0',
  `update_dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='隊伍資料';

--
-- 資料表的匯出資料 `team`
--

INSERT INTO `team` (`id`, `league_id`, `game_type`, `name_e`, `name_c`, `name_g`, `name_j`, `sname_e`, `sname_c`, `sname_g`, `sname_j`, `insert_dt`, `alias`, `sortid`, `web_id`, `update_dt`) VALUES
(1, 1, 'BS', ' smallbear', ' 小熊隊', '小熊隊', ' ', 'SB', '小熊', '小熊', ' ', NULL, 0, ' ', 0, '2017-07-03 01:10:48'),
(2, 1, 'BS', 'red_sox', '紅襪隊', '紅襪隊', ' ', 'RS', '紅襪', '紅襪', ' ', NULL, 0, ' ', 0, '2017-07-03 01:10:48'),
(3, 1, 'BS', 'bluebird', '藍鳥隊', '藍鳥隊', ' ', 'BB', '藍鳥', '藍鳥', ' ', NULL, 0, ' ', 0, '2017-07-03 01:12:54'),
(4, 1, 'BS', 'Yankee', '洋基隊', '洋基隊', ' ', 'YK', '洋基', '洋基', ' ', NULL, 0, ' ', 0, '2017-07-03 01:12:54'),
(5, 2, 'BS', ' marinfish', '馬林魚隊', '馬林魚隊', ' ', ' MF', '馬林魚', '馬林魚', ' ', NULL, 0, ' ', 0, '2017-07-03 01:14:59'),
(6, 2, 'BS', ' waterhand', '水手隊', '水手隊', ' ', 'WH', '水手', '水手', ' ', NULL, 0, ' ', 0, '2017-07-03 01:14:59'),
(7, 2, 'BS', 'tiger', '老虎隊', '老虎隊', ' ', 'TI', '老虎', '老虎', ' ', NULL, 0, ' ', 0, '2017-07-03 01:16:51'),
(8, 2, 'BS', 'bigcapital', '大都會隊', '大都會隊', ' ', 'BC', '大都會', '大都會', ' ', NULL, 0, ' ', 0, '2017-07-03 01:16:51'),
(9, 3, 'FT', 'Sportverein Werder Bremen', '文達不來梅體育俱樂部', '文達不來梅體育俱樂部', ' ', 'Werder Bremen', '文達不來梅', '文達不來梅', ' ', NULL, 0, ' ', 0, '2017-07-03 01:34:43'),
(10, 3, 'FT', 'Bayern München', '拜仁慕尼黑足球俱樂部註冊協會', '拜仁慕尼黑足球俱樂部註冊協會', ' ', 'Bayern', '拜仁慕尼黑', '拜仁慕尼黑', ' ', NULL, 0, ' ', 0, '2017-07-03 01:34:43'),
(11, 3, 'FT', 'Borussia Dortmund', '多特蒙德普魯士1909球類運動俱樂部', '多特蒙德普魯士1909球類運動俱樂部', ' ', 'Dortmund', '多特蒙德', '多特蒙德', ' ', NULL, 0, ' ', 0, '2017-07-03 01:37:34'),
(12, 3, 'FT', 'Verein für Bewegungsspiele', '斯圖加特1893體育俱樂部', '斯圖加特1893體育俱樂部', ' ', 'Stuttgart', '斯圖加特', '斯圖加特', ' ', NULL, 0, ' ', 0, '2017-07-03 01:37:34');

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
-- 資料表索引 `chksetresult`
--
ALTER TABLE `chksetresult`
  ADD PRIMARY KEY (`game_id`);

--
-- 資料表索引 `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `league_id` (`game_type`,`home_team`,`cust_team`,`start_dt`,`start_time`,`league_id`),
  ADD KEY `game_type` (`game_type`),
  ADD KEY `league_id_2` (`league_id`);

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
-- 資料表索引 `league`
--
ALTER TABLE `league`
  ADD PRIMARY KEY (`id`),
  ADD KEY `league_idx1` (`web_id`,`game_type`),
  ADD KEY `alias` (`alias`);

--
-- 資料表索引 `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`),
  ADD KEY `update_dt` (`update_dt`),
  ADD KEY `league_id` (`league_id`),
  ADD KEY `game_type` (`game_type`),
  ADD KEY `web_id` (`web_id`),
  ADD KEY `alias` (`alias`);

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
-- 使用資料表 AUTO_INCREMENT `game`
--
ALTER TABLE `game`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '賽事id', AUTO_INCREMENT=19;
--
-- 使用資料表 AUTO_INCREMENT `gamer`
--
ALTER TABLE `gamer`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '序號', AUTO_INCREMENT=19;
--
-- 使用資料表 AUTO_INCREMENT `league`
--
ALTER TABLE `league`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '聯盟id', AUTO_INCREMENT=7;
--
-- 使用資料表 AUTO_INCREMENT `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '隊伍id', AUTO_INCREMENT=13;
--
-- 使用資料表 AUTO_INCREMENT `web`
--
ALTER TABLE `web`
  MODIFY `id` tinyint(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '網站序號', AUTO_INCREMENT=9;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
