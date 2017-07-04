-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2017-07-04 12:23:11
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

--
-- 已匯出資料表的索引
--

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
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '隊伍id', AUTO_INCREMENT=13;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
