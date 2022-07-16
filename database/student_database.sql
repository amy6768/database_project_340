-- phpMyAdmin SQL Dump
-- version 5.2.0-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 12, 2022 at 03:26 AM
-- Server version: 10.6.8-MariaDB-log
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
--

-- --------------------------------------------------------

--
-- Table structure for table `BehaviorIncidents`
--

CREATE TABLE `BehaviorIncidents` (
  `idBehaviorIncident` int(11) NOT NULL,
  `observedBehavior` varchar(255) NOT NULL,
  `actionTaken` varchar(255) NOT NULL,
  `parentContact` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `idStudent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `BehaviorIncidents`
--

INSERT INTO `BehaviorIncidents` (`idBehaviorIncident`, `observedBehavior`, `actionTaken`, `parentContact`, `date`, `idStudent`) VALUES
(1, 'John hit student on the playground 8/25', 'Loss of recess for 1 day', 'Spoke to mom on phone 8/25', '2021-08-25', 1),
(2, 'John kicked student on carpet 9/4', 'Loss of lunch recess ', 'Spoke to dad on phone 9/4\r\n\r\n', '2021-09-04', 1),
(3, 'Austin became dysregulated, threw buckets and other objects, classroom was evacuated 9/5', 'Admin contacted - suspension for 1 day', 'Admin contacted mom on phone 9/5', '2021-09-05', 3);

-- --------------------------------------------------------

--
-- Table structure for table `Interventions`
--

CREATE TABLE `Interventions` (
  `idIntervention` int(11) NOT NULL,
  `interventionName` varchar(45) NOT NULL,
  `interventionDescription` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Interventions`
--

INSERT INTO `Interventions` (`idIntervention`, `interventionName`, `interventionDescription`) VALUES
(1, 'Phonics', 'Intervention to work on basic phonics.'),
(2, 'Math', 'Intervention to work on basic math.'),
(3, 'Behavior', 'Intervention to work on appropriate behavior.');

-- --------------------------------------------------------

--
-- Table structure for table `InterventionsProgress`
--

CREATE TABLE `InterventionsProgress` (
  `idInterventionProgress` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `interventionNotes` varchar(255) NOT NULL,
  `idIntervention` int(11) NOT NULL,
  `idStudent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `InterventionsProgress`
--

INSERT INTO `InterventionsProgress` (`idInterventionProgress`, `startDate`, `interventionNotes`, `idIntervention`, `idStudent`) VALUES
(1, '2021-10-01', 'John is progressing well.', 1, 1),
(2, '2022-01-08', 'We are working on adding and subtracting whole numbers. Going well.', 2, 3),
(3, '2022-04-09', 'Student is working on keeping hands to self.', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Parents`
--

CREATE TABLE `Parents` (
  `idParent` int(11) NOT NULL,
  `parentFirstName` varchar(45) NOT NULL,
  `parentLastName` varchar(45) NOT NULL,
  `phoneNumber` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Parents`
--

INSERT INTO `Parents` (`idParent`, `parentFirstName`, `parentLastName`, `phoneNumber`) VALUES
(1, 'Benny', 'Smith', '928-555-1284'),
(2, 'Mary', 'Smith', '928-555-4324'),
(3, 'Gregory', 'Marks', '928-555-9833'),
(4, 'Valerie', 'Marks', '928-555-8792');

-- --------------------------------------------------------

--
-- Table structure for table `Students`
--

CREATE TABLE `Students` (
  `idStudent` int(11) NOT NULL,
  `studentFirstName` varchar(45) NOT NULL,
  `studentLastName` varchar(45) NOT NULL,
  `birthdate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Students`
--

INSERT INTO `Students` (`idStudent`, `studentFirstName`, `studentLastName`, `birthdate`) VALUES
(1, 'John', 'Smith', '2012-12-24'),
(2, 'Elise', 'Marks', '2013-02-09'),
(3, 'Austin', 'Banks', '2013-05-10');

-- --------------------------------------------------------

--
-- Table structure for table `StudentsInterventions`
--

CREATE TABLE `StudentsInterventions` (
  `idStudentsIntervention` int(11) NOT NULL,
  `idIntervention` int(11) NOT NULL,
  `idStudent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `StudentsInterventions`
--

INSERT INTO `StudentsInterventions` (`idStudentsIntervention`, `idIntervention`, `idStudent`) VALUES
(1, 3, 1),
(2, 2, 2),
(3, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `StudentsParents`
--

CREATE TABLE `StudentsParents` (
  `idStudentsParent` int(11) NOT NULL,
  `idParent` int(11) NOT NULL,
  `idStudent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `StudentsParents`
--

INSERT INTO `StudentsParents` (`idStudentsParent`, `idParent`, `idStudent`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 3, 2),
(4, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `StudentsTeachers`
--

CREATE TABLE `StudentsTeachers` (
  `idStudentsTeacher` int(11) NOT NULL,
  `idTeacher` int(11) NOT NULL,
  `idStudent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `StudentsTeachers`
--

INSERT INTO `StudentsTeachers` (`idStudentsTeacher`, `idTeacher`, `idStudent`) VALUES
(1, 1, 1),
(2, 3, 2),
(3, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `StudentsTests`
--

CREATE TABLE `StudentsTests` (
  `idStudentTest` int(11) NOT NULL,
  `idStudent` int(11) NOT NULL,
  `idTest` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `StudentsTests`
--

INSERT INTO `StudentsTests` (`idStudentTest`, `idStudent`, `idTest`) VALUES
(1, 3, 1),
(2, 2, 1),
(11, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Teachers`
--

CREATE TABLE `Teachers` (
  `idTeacher` int(11) NOT NULL,
  `teacherFirstName` varchar(45) NOT NULL,
  `teacherLastName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Teachers`
--

INSERT INTO `Teachers` (`idTeacher`, `teacherFirstName`, `teacherLastName`) VALUES
(1, 'Mary', 'Nelson'),
(2, 'John', 'Smith'),
(3, 'Sharon', 'Beason');

-- --------------------------------------------------------

--
-- Table structure for table `Tests`
--

CREATE TABLE `Tests` (
  `idTest` int(11) NOT NULL,
  `testName` varchar(45) NOT NULL,
  `testDescription` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Tests`
--

INSERT INTO `Tests` (`idTest`, `testName`, `testDescription`) VALUES
(1, ' Phonics Letter Sounds', 'How many letter sounds student can identify out of 26'),
(2, 'Math Addition To Five', '5 addition to five problems'),
(3, 'Reading Fluency', 'How many words can student read in one minute');

-- --------------------------------------------------------

--
-- Table structure for table `TestScores`
--

CREATE TABLE `TestScores` (
  `idTestScore` int(11) NOT NULL,
  `testDate` date DEFAULT NULL,
  `testScore` int(11) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `idTest` int(11) NOT NULL,
  `idStudent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `TestScores`
--

INSERT INTO `TestScores` (`idTestScore`, `testDate`, `testScore`, `notes`, `idTest`, `idStudent`) VALUES
(1, '2021-10-01', 542, 'Student missed short vowel sounds for a, b and e. ', 2, 3),
(2, '2022-01-13', 10, 'Student passed all questions.', 2, 2),
(3, '2022-04-20', 100, 'Student passed the first fluency test.', 3, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `BehaviorIncidents`
--
ALTER TABLE `BehaviorIncidents`
  ADD PRIMARY KEY (`idBehaviorIncident`,`idStudent`),
  ADD UNIQUE KEY `idBehaviorIncident` (`idBehaviorIncident`),
  ADD KEY `fk_idStudent` (`idStudent`);

--
-- Indexes for table `Interventions`
--
ALTER TABLE `Interventions`
  ADD PRIMARY KEY (`idIntervention`),
  ADD UNIQUE KEY `idIntervention` (`idIntervention`);

--
-- Indexes for table `InterventionsProgress`
--
ALTER TABLE `InterventionsProgress`
  ADD PRIMARY KEY (`idInterventionProgress`,`idIntervention`,`idStudent`),
  ADD UNIQUE KEY `idInterventionProgress` (`idInterventionProgress`),
  ADD KEY `fk_InterventionsProgress_Interventions1_idx` (`idIntervention`),
  ADD KEY `fk_InterventionsProgress_Students1_idx` (`idStudent`);

--
-- Indexes for table `Parents`
--
ALTER TABLE `Parents`
  ADD PRIMARY KEY (`idParent`),
  ADD UNIQUE KEY `idParent` (`idParent`);

--
-- Indexes for table `Students`
--
ALTER TABLE `Students`
  ADD PRIMARY KEY (`idStudent`),
  ADD UNIQUE KEY `idStudent` (`idStudent`);

--
-- Indexes for table `StudentsInterventions`
--
ALTER TABLE `StudentsInterventions`
  ADD PRIMARY KEY (`idStudentsIntervention`,`idStudent`,`idIntervention`),
  ADD UNIQUE KEY `idStudentsIntervention` (`idStudentsIntervention`),
  ADD KEY `fk_interventionsIdIntervention` (`idIntervention`),
  ADD KEY `fk_interventionsIdStudent` (`idStudent`);

--
-- Indexes for table `StudentsParents`
--
ALTER TABLE `StudentsParents`
  ADD PRIMARY KEY (`idStudentsParent`,`idParent`,`idStudent`),
  ADD UNIQUE KEY `idStudentsParent` (`idStudentsParent`),
  ADD KEY `fk_studentsParentsIdStudent` (`idStudent`),
  ADD KEY `fk_studentsParentsIdParent` (`idParent`);

--
-- Indexes for table `StudentsTeachers`
--
ALTER TABLE `StudentsTeachers`
  ADD PRIMARY KEY (`idStudentsTeacher`,`idStudent`,`idTeacher`),
  ADD UNIQUE KEY `idStudentsTeacher` (`idStudentsTeacher`),
  ADD KEY `fk_idStudent` (`idStudent`),
  ADD KEY `fk_idTeacher` (`idTeacher`);

--
-- Indexes for table `StudentsTests`
--
ALTER TABLE `StudentsTests`
  ADD PRIMARY KEY (`idStudentTest`,`idStudent`,`idTest`),
  ADD UNIQUE KEY `idStudentTest` (`idStudentTest`),
  ADD KEY `fk_studentTestsIdTest` (`idTest`),
  ADD KEY `fk_studentTestsIdStudent` (`idStudent`);

--
-- Indexes for table `Teachers`
--
ALTER TABLE `Teachers`
  ADD PRIMARY KEY (`idTeacher`),
  ADD UNIQUE KEY `idTeacher` (`idTeacher`);

--
-- Indexes for table `Tests`
--
ALTER TABLE `Tests`
  ADD PRIMARY KEY (`idTest`),
  ADD UNIQUE KEY `idTest` (`idTest`);

--
-- Indexes for table `TestScores`
--
ALTER TABLE `TestScores`
  ADD PRIMARY KEY (`idTestScore`,`idTest`,`idStudent`),
  ADD UNIQUE KEY `idtestData` (`idTestScore`),
  ADD KEY `fk_idTest` (`idTest`),
  ADD KEY `fk_idStudent` (`idStudent`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `BehaviorIncidents`
--
ALTER TABLE `BehaviorIncidents`
  MODIFY `idBehaviorIncident` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Interventions`
--
ALTER TABLE `Interventions`
  MODIFY `idIntervention` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `InterventionsProgress`
--
ALTER TABLE `InterventionsProgress`
  MODIFY `idInterventionProgress` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Parents`
--
ALTER TABLE `Parents`
  MODIFY `idParent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Students`
--
ALTER TABLE `Students`
  MODIFY `idStudent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `StudentsInterventions`
--
ALTER TABLE `StudentsInterventions`
  MODIFY `idStudentsIntervention` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `StudentsParents`
--
ALTER TABLE `StudentsParents`
  MODIFY `idStudentsParent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `StudentsTeachers`
--
ALTER TABLE `StudentsTeachers`
  MODIFY `idStudentsTeacher` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `StudentsTests`
--
ALTER TABLE `StudentsTests`
  MODIFY `idStudentTest` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Teachers`
--
ALTER TABLE `Teachers`
  MODIFY `idTeacher` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Tests`
--
ALTER TABLE `Tests`
  MODIFY `idTest` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `TestScores`
--
ALTER TABLE `TestScores`
  MODIFY `idTestScore` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `BehaviorIncidents`
--
ALTER TABLE `BehaviorIncidents`
  ADD CONSTRAINT `fk_BehaviorIncidents_Students1` FOREIGN KEY (`idStudent`) REFERENCES `Students` (`idStudent`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `InterventionsProgress`
--
ALTER TABLE `InterventionsProgress`
  ADD CONSTRAINT `fk_InterventionsProgress_Interventions1` FOREIGN KEY (`idIntervention`) REFERENCES `Interventions` (`idIntervention`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_InterventionsProgress_Students1` FOREIGN KEY (`idStudent`) REFERENCES `Students` (`idStudent`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `StudentsInterventions`
--
ALTER TABLE `StudentsInterventions`
  ADD CONSTRAINT `fk_interventionsIdIntervention` FOREIGN KEY (`idIntervention`) REFERENCES `Interventions` (`idIntervention`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_interventionsIdStudent` FOREIGN KEY (`idStudent`) REFERENCES `Students` (`idStudent`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `StudentsParents`
--
ALTER TABLE `StudentsParents`
  ADD CONSTRAINT `fk_studentsParentsIdParent` FOREIGN KEY (`idParent`) REFERENCES `Parents` (`idParent`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_studentsParentsIdStudent` FOREIGN KEY (`idStudent`) REFERENCES `Students` (`idStudent`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `StudentsTeachers`
--
ALTER TABLE `StudentsTeachers`
  ADD CONSTRAINT `fk_Teachers_has_Students_Students1` FOREIGN KEY (`idStudent`) REFERENCES `Students` (`idStudent`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Teachers_has_Students_Teachers1` FOREIGN KEY (`idTeacher`) REFERENCES `Teachers` (`idTeacher`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `StudentsTests`
--
ALTER TABLE `StudentsTests`
  ADD CONSTRAINT `fk_studentTestsIdStudent` FOREIGN KEY (`idStudent`) REFERENCES `Students` (`idStudent`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_studentTestsIdTest` FOREIGN KEY (`idTest`) REFERENCES `Tests` (`idTest`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `TestScores`
--
ALTER TABLE `TestScores`
  ADD CONSTRAINT `fk_idStudent` FOREIGN KEY (`idStudent`) REFERENCES `Students` (`idStudent`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_idTest` FOREIGN KEY (`idTest`) REFERENCES `Tests` (`idTest`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
