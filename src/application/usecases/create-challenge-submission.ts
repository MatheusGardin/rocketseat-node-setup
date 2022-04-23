import { Submission } from "../../domain/entities/submission";
import { StudentRepository } from "../repositories/StudentRepository";
import { ChallengeRepository } from "../repositories/ChallengeRepository";

type CreateChallengeSubmissionRequest = {
	challengeId: string;
	studentId: string;
}

export class CreateChallengeSubmission {

	constructor(
		private studentRepository: StudentRepository,
		private challengeRepository: ChallengeRepository
	) {}

	async execute({ studentId, challengeId }: CreateChallengeSubmissionRequest) {
		const student = await this.studentRepository.findById(studentId);

		if (!student) {
			throw new Error('Student not found');
		}

		const challenge = await this.challengeRepository.findById(challengeId);

		if (!challenge) {
			throw new Error('Challenge not found');
		}

		const submission = Submission.create({
			challengeId, studentId
		});

		return submission;
	}
}