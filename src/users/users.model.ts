import { ApiProperty } from '@nestjs/swagger'
import {
	BelongsToMany,
	Column,
	DataType,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import { Post } from 'src/posts/posts.model'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/user-roles.model'

interface UserCreationAttrs {
	email: string
	password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({ example: '1', description: 'unique identifier' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'user@gmail.com', description: 'E-mail' })
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	email: string

	@ApiProperty({ example: '12345678', description: 'Password' })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password: string

	@ApiProperty({ example: 'true', description: 'Is the user banned or not' })
	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false,
	})
	banned: boolean

	@ApiProperty({
		example: 'For hooliganism',
		description: 'Reason for blocking',
	})
	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	banReason: string

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[]

	@HasMany(() => Post)
	posts: Post[]
}
