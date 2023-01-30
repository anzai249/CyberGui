/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 80028 (8.0.28)
 Source Host           : localhost:3306
 Source Schema         : anonymous_question

 Target Server Type    : MySQL
 Target Server Version : 80028 (8.0.28)
 File Encoding         : 65001

 Date: 30/01/2023 19:31:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for answers
-- ----------------------------
DROP TABLE IF EXISTS `answers`;
CREATE TABLE `answers`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `time` datetime NULL DEFAULT NULL,
  `answer` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of answers
-- ----------------------------

-- ----------------------------
-- Table structure for questions
-- ----------------------------
DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `time` datetime NULL DEFAULT NULL,
  `question` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `like` int NOT NULL DEFAULT 0,
  `dislike` int NOT NULL DEFAULT 0,
  `sensitive` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of questions
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
