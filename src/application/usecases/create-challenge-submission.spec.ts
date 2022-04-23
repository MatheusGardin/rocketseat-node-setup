import { CreateChallengeSubmission } from "./create-challenge-submission";
import { InMemoryStudentRepository } from "../../tests/repositories/in-memory-student-repository";
import { InMemoryChallengeRepository } from "../../tests/repositories/in-memory-challenge-repository";
import { Student } from "../../domain/entities/student";
import { Challenge } from "../../domain/entities/challenge";

describe('Create challenge submission use case', () => {
	it('should be able to create a new challenge submission', async () => {
		const studentRepository = new InMemoryStudentRepository();
		const challengeRepository = new InMemoryChallengeRepository();

		const student = Student.create({
			name: 'Matheus',
			email: 'matheus@example.com'
		});

		const challenge = Challenge.create({
			title: 'Challenge 1',
			instructionsUrl: 'https://example.com',
		});

		studentRepository.items.push(student);
		challengeRepository.items.push(challenge);

		const sut = new CreateChallengeSubmission(
			studentRepository,
			challengeRepository
		);

		const response = await sut.execute({
			studentId: student.id,
			challengeId: challenge.id
		});

		expect(response).toBeTruthy();
	});
});