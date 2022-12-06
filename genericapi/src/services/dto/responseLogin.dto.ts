import { User } from "../../users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class ResponseLoginDto {
	@ApiProperty({
		description: "Login Token",
		example:
			"asiudjklasnafjlskcsmn80wrioklqaq3uoa.auisdjnklxc82839qiwdoascmkshureqwdjpasmkglçmefwjioahvunjsadlskmrlçwmefapjd.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
	})
	token: string;

	@ApiProperty({
		description: "User Data",
	})
	user: User;
}
