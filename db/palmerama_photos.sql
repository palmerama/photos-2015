-- phpMyAdmin SQL Dump
-- version 3.5.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 25, 2015 at 05:35 PM
-- Server version: 5.5.29
-- PHP Version: 5.4.10

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `palmerama_photos`
--

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
CREATE TABLE `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `active` tinyint(4) NOT NULL,
  `cover_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`id`, `title`, `active`, `cover_id`) VALUES
(1, 'india', 1, 35),
(2, 'california', 1, 97),
(3, 'canada', 1, 145),
(4, 'birds', 1, 158),
(5, 'derbyshire', 1, 176);

-- --------------------------------------------------------

--
-- Table structure for table `album_photos`
--

DROP TABLE IF EXISTS `album_photos`;
CREATE TABLE `album_photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `full_width` int(2) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=178 ;

--
-- Dumping data for table `album_photos`
--

INSERT INTO `album_photos` (`id`, `photo_id`, `album_id`, `full_width`, `active`) VALUES
(1, 1, 1, 1, 1),
(2, 2, 1, 0, 1),
(3, 3, 1, 1, 1),
(4, 4, 1, 0, 1),
(5, 5, 1, 1, 1),
(6, 6, 1, 0, 1),
(7, 7, 1, 0, 1),
(8, 8, 1, 0, 0),
(9, 9, 1, 0, 1),
(10, 10, 1, 0, 1),
(11, 11, 1, 1, 1),
(12, 12, 1, 0, 1),
(13, 13, 1, 1, 1),
(14, 14, 1, 0, 0),
(15, 15, 1, 0, 0),
(16, 16, 1, 0, 0),
(17, 17, 1, 0, 0),
(18, 18, 1, 0, 1),
(19, 19, 1, 1, 1),
(20, 20, 1, 0, 1),
(21, 21, 1, 0, 1),
(22, 22, 1, 0, 1),
(23, 23, 1, 0, 0),
(24, 24, 1, 0, 1),
(25, 25, 1, 1, 1),
(26, 26, 1, 0, 1),
(27, 27, 1, 1, 1),
(28, 28, 1, 0, 1),
(29, 29, 1, 0, 1),
(30, 30, 1, 0, 1),
(31, 31, 1, 0, 1),
(32, 32, 1, 0, 1),
(33, 33, 1, 1, 1),
(34, 34, 1, 0, 1),
(35, 35, 1, 1, 1),
(36, 36, 1, 0, 0),
(37, 37, 1, 0, 1),
(38, 38, 1, 0, 1),
(39, 39, 1, 0, 1),
(40, 40, 1, 0, 1),
(41, 41, 1, 1, 1),
(42, 42, 1, 0, 0),
(43, 43, 1, 0, 1),
(44, 44, 1, 1, 1),
(45, 45, 1, 1, 1),
(46, 46, 1, 0, 0),
(47, 47, 1, 0, 1),
(48, 48, 1, 0, 1),
(49, 49, 1, 0, 1),
(50, 50, 2, 0, 0),
(51, 51, 2, 0, 0),
(52, 52, 2, 0, 0),
(53, 53, 2, 1, 1),
(54, 54, 2, 0, 1),
(55, 55, 2, 0, 1),
(56, 56, 2, 0, 1),
(57, 57, 2, 0, 0),
(58, 58, 2, 1, 1),
(59, 59, 2, 0, 0),
(60, 60, 2, 0, 0),
(61, 61, 2, 0, 1),
(62, 62, 2, 1, 1),
(63, 63, 2, 0, 1),
(64, 64, 2, 0, 1),
(65, 65, 2, 1, 1),
(66, 66, 2, 0, 1),
(67, 67, 2, 1, 1),
(68, 68, 2, 0, 0),
(69, 69, 2, 0, 1),
(70, 70, 2, 0, 1),
(71, 71, 2, 0, 1),
(72, 72, 2, 0, 0),
(73, 73, 2, 1, 1),
(74, 74, 2, 1, 1),
(75, 75, 2, 0, 1),
(76, 76, 2, 0, 1),
(77, 77, 2, 0, 1),
(78, 78, 2, 0, 1),
(79, 79, 2, 1, 1),
(80, 80, 2, 1, 1),
(81, 81, 2, 0, 1),
(82, 82, 2, 0, 0),
(83, 83, 2, 0, 0),
(84, 84, 2, 0, 1),
(85, 85, 2, 0, 1),
(86, 86, 2, 0, 0),
(87, 87, 2, 0, 1),
(88, 88, 2, 0, 0),
(89, 89, 2, 0, 0),
(90, 90, 2, 0, 1),
(91, 91, 2, 0, 0),
(92, 92, 2, 0, 0),
(93, 93, 2, 0, 1),
(94, 94, 2, 0, 1),
(95, 95, 2, 0, 0),
(96, 96, 2, 0, 1),
(97, 97, 2, 1, 1),
(98, 98, 2, 1, 1),
(99, 99, 2, 0, 1),
(100, 100, 2, 0, 1),
(101, 101, 2, 0, 0),
(102, 102, 2, 0, 1),
(103, 103, 2, 0, 1),
(104, 104, 2, 0, 1),
(105, 105, 2, 0, 1),
(106, 106, 2, 1, 1),
(107, 107, 2, 0, 1),
(108, 108, 2, 1, 1),
(109, 109, 2, 0, 0),
(110, 110, 2, 0, 1),
(111, 111, 2, 0, 0),
(112, 112, 2, 1, 1),
(113, 113, 2, 0, 0),
(114, 114, 2, 0, 1),
(115, 115, 3, 1, 1),
(116, 116, 3, 0, 1),
(117, 117, 3, 0, 1),
(118, 118, 3, 0, 1),
(119, 119, 3, 1, 1),
(120, 120, 3, 1, 1),
(121, 121, 3, 0, 1),
(122, 122, 3, 0, 1),
(123, 123, 3, 0, 1),
(124, 124, 3, 0, 1),
(125, 125, 3, 0, 0),
(126, 126, 3, 0, 1),
(127, 127, 3, 0, 1),
(128, 128, 3, 1, 1),
(129, 129, 3, 0, 1),
(130, 130, 3, 1, 1),
(131, 131, 3, 0, 1),
(132, 132, 3, 1, 1),
(133, 133, 3, 0, 1),
(134, 134, 3, 0, 1),
(135, 135, 3, 0, 1),
(136, 136, 3, 0, 1),
(137, 137, 3, 0, 1),
(138, 138, 3, 0, 1),
(139, 139, 3, 0, 0),
(140, 140, 3, 0, 1),
(141, 141, 3, 0, 0),
(142, 142, 3, 1, 1),
(143, 143, 3, 0, 0),
(144, 144, 3, 1, 1),
(145, 145, 3, 1, 1),
(146, 146, 3, 1, 1),
(147, 147, 3, 0, 1),
(148, 148, 3, 0, 0),
(149, 149, 3, 0, 0),
(150, 150, 3, 1, 1),
(151, 151, 3, 0, 0),
(152, 152, 3, 0, 1),
(153, 153, 3, 0, 0),
(154, 154, 3, 0, 0),
(155, 155, 4, 0, 1),
(156, 156, 4, 0, 1),
(157, 157, 4, 1, 1),
(158, 158, 4, 1, 1),
(159, 159, 4, 0, 1),
(160, 160, 4, 0, 1),
(161, 161, 4, 0, 1),
(162, 162, 4, 1, 1),
(163, 163, 4, 0, 1),
(164, 164, 4, 1, 1),
(165, 165, 5, 0, 1),
(166, 166, 5, 0, 1),
(167, 167, 5, 0, 1),
(168, 168, 5, 0, 1),
(169, 169, 5, 1, 1),
(170, 170, 5, 0, 1),
(171, 171, 5, 0, 0),
(172, 172, 5, 0, 1),
(173, 173, 5, 0, 1),
(174, 174, 5, 1, 1),
(175, 175, 5, 0, 1),
(176, 176, 5, 1, 1),
(177, 177, 5, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `position` int(11) NOT NULL,
  `ratio` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=178 ;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `position`, `ratio`) VALUES
(1, 2, 0.666732),
(2, 22, 1.5),
(3, 29, 0.666667),
(4, 12, 0.666602),
(5, 26, 0.666737),
(6, 21, 0.666667),
(7, 7, 0.666667),
(8, 16, 0.666667),
(9, 27, 0.666667),
(10, 9, 1.49977),
(11, 14, 0.666734),
(12, 16, 1.5),
(13, 38, 0.666667),
(14, 7, 1.5),
(15, 22, 0.666735),
(16, 25, 0.666599),
(17, 44, 1.49985),
(18, 25, 1.49985),
(19, 32, 0.666736),
(20, 15, 1.50015),
(21, 28, 0.666735),
(22, 18, 1),
(23, 12, 1.49984),
(24, 4, 1.5),
(25, 17, 0.80005),
(26, 0, 1),
(27, 20, 0.666667),
(28, 3, 0.666667),
(29, 1, 1.49985),
(30, 6, 0.666667),
(31, 39, 1),
(32, 37, 1.39982),
(33, 23, 0.666667),
(34, 19, 0.666667),
(35, 8, 0.666667),
(36, 28, 1),
(37, 13, 0.666667),
(38, 34, 0.666588),
(39, 33, 1.5),
(40, 24, 1),
(41, 35, 0.562599),
(42, 21, 0.666667),
(43, 31, 0.666667),
(44, 11, 0.666667),
(45, 5, 0.666573),
(46, 18, 0.666739),
(47, 10, 0.666599),
(48, 30, 0.666598),
(49, 36, 1.5),
(50, 3, 0.666431),
(51, 23, 1),
(52, 6, 0.666732),
(53, 8, 0.666739),
(54, 3, 1.5),
(55, 13, 0.666667),
(56, 44, 0.666754),
(57, 18, 1.5),
(58, 5, 0.666667),
(59, 12, 1.50019),
(60, 3, 1.50019),
(61, 10, 0.666667),
(62, 17, 1),
(63, 43, 0.666667),
(64, 16, 0.666667),
(65, 35, 0.666586),
(66, 7, 0.666667),
(67, 11, 0.666742),
(68, 25, 1),
(69, 36, 1.5),
(70, 37, 0.666667),
(71, 40, 1.50016),
(72, 3, 0.666599),
(73, 29, 1.39984),
(74, 26, 0.666667),
(75, 19, 1.50015),
(76, 31, 0.562512),
(77, 42, 0.666737),
(78, 12, 0.666602),
(79, 23, 1),
(80, 41, 0.666472),
(81, 6, 1),
(82, 2, 0.666667),
(83, 35, 0.562513),
(84, 9, 1),
(85, 33, 1),
(86, 35, 0.666667),
(87, 39, 0.66678),
(88, 47, 1),
(89, 2, 1),
(90, 28, 0.562488),
(91, 44, 0.666667),
(92, 18, 0.666775),
(93, 21, 0.666767),
(94, 27, 0.666751),
(95, 40, 0.666736),
(96, 18, 0.66674),
(97, 2, 0.5625),
(98, 14, 0.666667),
(99, 4, 0.562514),
(100, 25, 0.562512),
(101, 28, 1),
(102, 22, 0.666667),
(103, 1, 0.666667),
(104, 24, 0.666749),
(105, 15, 1),
(106, 32, 0.562439),
(107, 34, 0.714348),
(108, 38, 0.666667),
(109, 9, 0.666667),
(110, 0, 1.39983),
(111, 1, 1.5),
(112, 20, 0.666667),
(113, 5, 1),
(114, 30, 0.562534),
(115, 11, 0.666667),
(116, 0, 0.666746),
(117, 9, 0.666667),
(118, 6, 1.5),
(119, 5, 0.666667),
(120, 14, 0.666667),
(121, 25, 1.24985),
(122, 22, 1.39988),
(123, 13, 0.5625),
(124, 3, 0.666739),
(125, 12, 0.666667),
(126, 1, 0.666759),
(127, 7, 1.39988),
(128, 8, 0.714351),
(129, 4, 1.25016),
(130, 30, 0.625),
(131, 28, 0.714318),
(132, 26, 1.39988),
(133, 19, 0.666595),
(134, 16, 0.666667),
(135, 21, 0.666667),
(136, 10, 1.39988),
(137, 27, 1.29421),
(138, 18, 0.666667),
(139, 15, 1.5),
(140, 24, 1.5),
(141, 21, 0.666741),
(142, 17, 0.56255),
(143, 18, 0.666667),
(144, 29, 0.666745),
(145, 2, 0.666667),
(146, 23, 0.562575),
(147, 12, 0.666667),
(148, 38, 0.666733),
(149, 10, 0.666753),
(150, 20, 0.562561),
(151, 34, 0.666667),
(152, 15, 0.5625),
(153, 21, 0.5625),
(154, 1, 0.412369),
(155, 0, 1.5),
(156, 3, 1),
(157, 5, 1),
(158, 8, 1),
(159, 7, 0.697337),
(160, 6, 0.666667),
(161, 4, 1.29559),
(162, 2, 0.626302),
(163, 1, 1),
(164, 9, 0.683445),
(165, 10, 1.5),
(166, 3, 0.639368),
(167, 6, 1.5),
(168, 9, 0.666667),
(169, 2, 1.37959),
(170, 7, 0.666667),
(171, 0, 0.5625),
(172, 1, 1.36914),
(173, 4, 1.4239),
(174, 11, 1.5),
(175, 0, 0.562584),
(176, 8, 0.666667),
(177, 5, 0.636628);
SET FOREIGN_KEY_CHECKS=1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
