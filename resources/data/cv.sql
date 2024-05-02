



--
-- 表的结构 `bidhistory`
--

DROP TABLE IF EXISTS `bidhistory`;
CREATE TABLE IF NOT EXISTS `bidhistory` (
  `HistoryID` int(11) NOT NULL,
  `BidID` int(11) DEFAULT NULL,
  `BidderID` int(11) DEFAULT NULL,
  `BidAmount` decimal(10,2) DEFAULT NULL,
  `BidTime` datetime DEFAULT NULL,
  PRIMARY KEY (`HistoryID`),
  KEY `BidID` (`BidID`),
  KEY `BidderID` (`BidderID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf32 COLLATE=utf32_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `bids`
--

DROP TABLE IF EXISTS `bids`;
CREATE TABLE IF NOT EXISTS `bids` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bidStampId` int(11) DEFAULT NULL,
  `bidderId` int(11) DEFAULT NULL,
  `bidTime` datetime DEFAULT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `favorites` varchar(45) NOT NULL,
  `auctionCount` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `BidStampID` (`bidStampId`),
  KEY `BidderID` (`bidderId`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf32 COLLATE=utf32_general_ci;

--
-- 转存表中的数据 `bids`
--

INSERT INTO `bids` (`id`, `bidStampId`, `bidderId`, `bidTime`, `startDate`, `endDate`, `favorites`, `auctionCount`) VALUES
(1, 1, 26, '2023-07-04 22:25:14', '2023-07-03', '2023-09-28', 'oui', 0),
(2, 2, 26, '2023-07-10 05:57:51', '2023-07-02', '2023-07-25', 'non', 0),
(3, 3, 26, '2023-07-01 12:00:00', '2023-07-06', '2023-07-07', 'non', 2),
(4, 4, 26, '2023-07-02 13:00:00', '2023-07-03', '2023-07-05', 'oui', 4),
(5, 5, 26, '2023-07-02 14:00:00', '2023-07-06', '2023-07-07', 'oui', 1),
(6, 6, 26, '2023-07-03 15:00:00', '2023-07-04', '2023-07-05', 'non', 2),
(7, 7, 26, '2023-07-04 16:00:00', '2023-07-05', '2023-07-06', 'oui', 3),
(8, 8, 26, '2023-07-04 17:00:00', '2023-07-07', '2023-07-09', 'non', 2),
(9, 9, 26, '2023-07-05 18:00:00', '2023-07-06', '2023-07-08', 'oui', 4),
(10, 10, 26, '2023-07-05 19:00:00', '2023-07-09', '2023-07-10', 'oui', 1),
(12, 14, 30, '2023-06-10 00:00:00', '2023-06-10', '2023-06-17', 'oui', 0),
(23, 25, 30, '2023-06-10 00:00:00', '2023-06-10', '2023-06-17', 'oui', 0),
(14, 16, 30, '2023-06-10 00:00:00', '2023-06-10', '2023-06-17', 'oui', 0),
(16, 18, 30, '2023-09-02 00:00:00', '2023-09-02', '2023-10-05', 'oui', 0),
(22, 24, 30, '2023-06-10 00:00:00', '2023-06-10', '2023-06-17', 'oui', 0),
(21, 23, 30, '2023-06-10 00:00:00', '2023-06-10', '2023-06-17', 'oui', 0),
(20, 22, 30, '2023-06-10 00:00:00', '2023-06-10', '2023-06-17', 'oui', 0),
(24, 26, 30, '2023-06-10 00:00:00', '2023-06-10', '2023-06-17', 'oui', 0),
(25, 27, 30, '2023-06-10 00:00:00', '2023-06-10', '2023-06-17', 'oui', 0),
(26, 28, 30, '2023-06-10 00:00:00', '2023-06-10', '2023-06-17', 'oui', 0),
(27, 29, 30, '2023-06-10 00:00:00', '2023-06-10', '2023-06-17', 'oui', 0),
(28, 30, 32, '2023-06-10 00:00:00', '2023-06-10', '2023-06-17', 'oui', 0);

-- --------------------------------------------------------

--
-- 表的结构 `profiles`
--

DROP TABLE IF EXISTS `profiles`;
CREATE TABLE IF NOT EXISTS `profiles` (
  `ProfileID` int(11) NOT NULL,
  `profile` varchar(50) NOT NULL,
  PRIMARY KEY (`ProfileID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf32 COLLATE=utf32_general_ci;

--
-- 转存表中的数据 `profiles`
--

INSERT INTO `profiles` (`ProfileID`, `profile`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- 表的结构 `stampimages`
--

DROP TABLE IF EXISTS `stampimages`;
CREATE TABLE IF NOT EXISTS `stampimages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stampId` int(11) DEFAULT NULL,
  `imageURL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `StampID` (`stampId`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf32 COLLATE=utf32_general_ci;

--
-- 转存表中的数据 `stampimages`
--

INSERT INTO `stampimages` (`id`, `stampId`, `imageURL`) VALUES
(1, 1, '\\img\\jpg\\encheres\\timbre-5.jpg'),
(2, 2, '\\img\\jpg\\encheres\\timbre-1.jpg'),
(3, 3, '\\img\\jpg\\encheres\\timbre-1.jpg'),
(4, 4, '\\img\\jpg\\encheres\\timbre-2.jpg'),
(5, 5, '\\img\\jpg\\encheres\\timbre-3.jpg'),
(6, 6, '\\img\\jpg\\encheres\\timbre-4.jpg'),
(7, 7, '\\img\\jpg\\hero-accueil.jpg'),
(8, 8, '\\img\\jpg\\hero-catalogue-enchere.jpg'),
(9, 9, '\\img\\jpg\\actualites\\article-1.jpg'),
(10, 10, '\\img\\jpg\\actualites\\article-2.jpg'),
(11, 14, '\\img\\jpg\\encheres\\肖申克的救赎.jpg'),
(12, 15, '\\img\\jpg\\encheres\\发发发.jpg'),
(13, 16, '\\img\\jpg\\encheres\\发发发.jpg'),
(14, 17, '\\img\\jpg\\encheres\\笔试.jpg'),
(15, 18, '\\img\\jpg\\encheres\\笔试.jpg'),
(16, 19, NULL),
(17, 20, NULL),
(18, 21, '\\img\\jpg\\encheres\\222.jpg'),
(19, 22, '\\img\\jpg\\encheres\\111.jpg'),
(20, 23, '\\img\\jpg\\encheres\\肖申克的救赎.jpg'),
(21, 24, '\\img\\jpg\\encheres\\肖申克的救赎.jpg'),
(22, 25, '\\img\\jpg\\encheres\\222.jpg'),
(23, 26, '\\img\\jpg\\encheres\\timbre-5.jpg'),
(24, 27, '\\img\\jpg\\encheres\\thumbnail-enchere-2.jpg'),
(25, 28, '\\img\\jpg\\encheres\\timbre-1.jpg'),
(26, 29, '\\img\\jpg\\encheres\\thumbnail-enchere-3.jpg'),
(27, 30, '\\img\\jpg\\encheres\\发发发.jpg'),
(28, 31, '\\img\\jpg\\encheres\\三国杀.jpg'),
(29, 32, '\\img\\jpg\\encheres\\三国杀.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `stamps`
--

DROP TABLE IF EXISTS `stamps`;
CREATE TABLE IF NOT EXISTS `stamps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `startingPrice` decimal(10,2) DEFAULT NULL,
  `reservePrice` decimal(10,2) DEFAULT NULL,
  `creationDate` date NOT NULL,
  `dimensions` varchar(255) NOT NULL,
  `country` varchar(50) NOT NULL,
  `conditions` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `certified` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `type` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf32 COLLATE=utf32_general_ci;

--
-- 转存表中的数据 `stamps`
--

INSERT INTO `stamps` (`id`, `name`, `startingPrice`, `reservePrice`, `creationDate`, `dimensions`, `country`, `conditions`, `status`, `certified`, `description`, `type`) VALUES
(1, 'test CYPRUS 95 LH', '10.50', '10.50', '2016-07-19', 'Bloc 2 timbres, 6 x 4 pc', 'États-unis', 'Excellente', 'en cours', 'oui', 'Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Général'),
(2, 'Crystal 22 LH', '21.00', '21.00', '2023-07-02', 'Bloc 2 timbres, 6 x 4 pc', 'Chine', 'Parfaite', 'en cours', 'oui', '2orem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Général'),
(3, 'Stamp 1', '10.99', '20.99', '2023-07-01', '2cm x 3cm', 'USA', 'Excellente', 'Available', 'Yes', 'Description for Stamp 1', 'Général'),
(4, 'Stamp 2', '5.99', '15.99', '2023-07-02', '3cm x 4cm', 'UK', 'Bonne', 'Available', 'No', 'Description for Stamp 2', 'Général'),
(5, 'Stamp 3', '7.99', '17.99', '2023-07-03', '2.5cm x 3.5cm', 'USA', 'Bonne', 'Sold', 'Yes', 'Description for Stamp 3', 'Général'),
(6, 'Stamp 4', '12.99', '22.99', '2023-07-04', '4cm x 4cm', 'Germany', 'Excellente', 'Available', 'No', 'Description for Stamp 4', 'Général'),
(7, 'Stamp 5', '8.99', '18.99', '2023-07-05', '3.5cm x 4.5cm', 'UK', 'Bonne', 'Available', 'Yes', 'Description for Stamp 5', 'Général'),
(8, 'Stamp 6', '6.99', '16.99', '2023-07-06', '2cm x 3cm', 'USA', 'Excellente', 'Sold', 'Yes', 'Description for Stamp 6', 'Général'),
(9, 'Stamp 7', '9.99', '19.99', '2023-07-07', '3cm x 3cm', 'USA', 'Excellente', 'Available', 'No', 'Description for Stamp 7', 'Général'),
(10, 'Stamp 8', '14.99', '24.99', '2023-07-08', '4cm x 5cm', 'Germany', 'Excellente', 'Available', 'Yes', 'Description for Stamp 8', 'Général'),
(11, 'Stamp 9', '11.99', '21.99', '2023-07-09', '2.5cm x 3.5cm', 'UK', 'Bonne', 'Available', 'No', 'Description for Stamp 9', 'Général'),
(12, 'Stamp 10', '7.99', '17.99', '2023-07-10', '3.5cm x 4.5cm', 'USA', 'Excellente', 'Available', 'Yes', 'Description for Stamp 10', 'Général'),
(14, 'stampName', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Général'),
(17, 'stampName', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Regular'),
(16, 'stampNametest', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Général'),
(18, 'stampName', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Général'),
(19, 'stampName', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Regular'),
(20, 'stampName', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Regular'),
(21, 'stampName', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Regular'),
(22, 'stampName', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'test', 'Général'),
(23, 'stampName', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Général'),
(24, 'stampName', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Regular'),
(25, 'stampName', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Regular'),
(26, 'stampName', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Regular'),
(27, 'stampName', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Regular'),
(28, 'stampName', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Regular'),
(29, 'stampName', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Regular'),
(30, 'stampName', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'la premier tembre de hangfei', 'Regular'),
(31, 'test', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Regular'),
(32, 'test11', '10.00', '10.00', '2003-06-17', '2cm x 3cm', 'Canada', 'Excellente', 'Available', 'Yes', 'Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate', 'Regular');

-- --------------------------------------------------------

--
-- 表的结构 `transactions`
--

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE IF NOT EXISTS `transactions` (
  `TransactionID` int(11) NOT NULL,
  `TransactionsStampID` int(11) DEFAULT NULL,
  `TransactionsSellerID` int(11) DEFAULT NULL,
  `BuyerID` int(11) DEFAULT NULL,
  `TransactionAmount` decimal(10,2) DEFAULT NULL,
  `TransactionDate` date DEFAULT NULL,
  PRIMARY KEY (`TransactionID`),
  KEY `TransactionsStampID` (`TransactionsStampID`),
  KEY `TransactionsSellerID` (`TransactionsSellerID`),
  KEY `BuyerID` (`BuyerID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf32 COLLATE=utf32_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `userProfileID` int(11) DEFAULT NULL,
  `updated_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserProfileID` (`userProfileID`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf32 COLLATE=utf32_general_ci;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `userProfileID`, `updated_at`, `created_at`) VALUES
(1, 'Admin', 'admin@gmail.com', 'aaaa', 1, '2023-07-02 04:00:00', '0000-00-00 00:00:00'),
(26, 'hangfei', '1023584582@qq.com', '$2y$10$2NT7Mdgdtys9zW8sMfz/7ew2vRDaYrjut6vDR05CP8Gd7HUUxedGq', 2, '2023-07-04 11:24:48', '2023-07-04 11:24:48'),
(27, 'test', 'test@gmail.com', '$2y$10$Kkcz0NqQ5umuxcJcvOTg9OeYQpKh62jlAnO2.eUZs6HVMzr5m8Uw.', 2, '2023-07-04 11:32:03', '2023-07-04 11:32:03'),
(28, 'Nicola', 'Nicola@gmail.com', '$2y$10$aMFG9m8c0mwZSCTvFmzYaOY.wpGKYR9TivTwU96Sz5kUQqxkGA07e', 2, '2023-07-09 00:33:30', '2023-07-09 00:33:30'),
(29, 'Philipe', 'Philipe@gmail.com', '$2y$10$q9TItpj7/k9h2Kg1xzoOj.77GENiwk121rEBe1p6wwzDvcaTsk3cK', 2, '2023-07-09 00:34:02', '2023-07-09 00:34:02'),
(30, 'Lily', 'Lily@gmail.com', '$2y$10$Sy4umluiNf76gNrUAweW0O7cLpxFy/yKrcyp2bsgRdeLlgpXmJIrC', 2, '2023-07-09 00:34:22', '2023-07-09 00:34:22'),
(32, 'Hangfei', 'Hangfei@gmail.com', '$2y$10$/bEPuYUWTFEuLkFrwFlwG.BiGPf92n/HOK/13MTnERNxG47Neqai2', 2, '2023-09-30 21:47:31', '2023-09-30 21:47:31');

-- --------------------------------------------------------

--
-- 表的结构 `watchlist`
--

DROP TABLE IF EXISTS `watchlist`;
CREATE TABLE IF NOT EXISTS `watchlist` (
  `WatchlistID` int(11) NOT NULL,
  `WatchlistUserID` int(11) DEFAULT NULL,
  `WatchlistStampID` int(11) DEFAULT NULL,
  PRIMARY KEY (`WatchlistID`),
  KEY `WatchlistUserID` (`WatchlistUserID`),
  KEY `WatchlistStampID` (`WatchlistStampID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf32 COLLATE=utf32_general_ci;
COMMIT;