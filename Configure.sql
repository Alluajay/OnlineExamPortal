
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Creating a database
--

CREATE DATABASE `quiz_db`;


--
-- Table structure for table `host_user`
--

CREATE TABLE `quiz_db`.`host_user` (
  `uid` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `dept` varchar(40) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `staffid` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


--
-- Table structure for table `part_user`
--

CREATE TABLE `quiz_db`.`part_user` (
  `uid` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `regno` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Table structure for table `quiz_list`
--

CREATE TABLE `quiz_db`.`quiz_list` (
  `sno` int(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `ques_table_link` varchar(30) NOT NULL,
  `descr` varchar(200) NOT NULL,
  `result_tab_link` varchar(20) NOT NULL,
  `conducted_by` varchar(40) NOT NULL,
  `hours` int(10) NOT NULL,
  `mins` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
