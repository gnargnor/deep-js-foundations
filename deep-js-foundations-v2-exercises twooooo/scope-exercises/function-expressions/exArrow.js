var getStudentId = studentId => {
  return studentRecords.find(function matchId(record) {
		return record.id == studentId;
	});
}

function getStudentId(studentId) {
	return studentRecords.find(function matchId(record) {
		return record.id == studentId;
	});

}