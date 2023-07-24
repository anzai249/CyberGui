/*
 Navicat MySQL Data Transfer

 Source Server         : Local Mysql 8.0
 Source Server Type    : MySQL
 Source Server Version : 80032 (8.0.32)
 Source Host           : localhost:3306
 Source Schema         : cybergui

 Target Server Type    : MySQL
 Target Server Version : 80032 (8.0.32)
 File Encoding         : 65001

 Date: 24/07/2023 23:17:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for answers
-- ----------------------------
DROP TABLE IF EXISTS `answers`;
CREATE TABLE `answers` (
  `id` int(8) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `time` datetime DEFAULT NULL,
  `answer` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of answers
-- ----------------------------
BEGIN;
INSERT INTO `answers` (`id`, `time`, `answer`) VALUES (00000001, '2023-07-24 14:45:26', '你才是，你全家都是');
COMMIT;

-- ----------------------------
-- Table structure for ban
-- ----------------------------
DROP TABLE IF EXISTS `ban`;
CREATE TABLE `ban` (
  `ip` varchar(15) NOT NULL,
  `time` datetime NOT NULL,
  `event` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of ban
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `questionid` int NOT NULL,
  `comment` tinyint NOT NULL,
  `ip` varchar(15) DEFAULT NULL,
  KEY `questionid` (`questionid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of comment
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for questions
-- ----------------------------
DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions` (
  `id` int(8) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `time` datetime NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `like` int NOT NULL DEFAULT '0',
  `dislike` int NOT NULL DEFAULT '0',
  `sensitive` tinyint NOT NULL DEFAULT '0',
  `answerid` int(8) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `answerid` (`answerid`) USING BTREE,
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`answerid`) REFERENCES `answers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of questions
-- ----------------------------
BEGIN;
INSERT INTO `questions` (`id`, `time`, `title`, `content`, `like`, `dislike`, `sensitive`, `answerid`) VALUES (00000001, '2023-07-24 13:29:16', '', '你好', 10, 5, 0, NULL);
INSERT INTO `questions` (`id`, `time`, `title`, `content`, `like`, `dislike`, `sensitive`, `answerid`) VALUES (00000002, '2023-07-24 14:35:44', '您是傻逼吗?', '我想请问，您是傻逼吗', 0, 114514, 1, 00000001);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
