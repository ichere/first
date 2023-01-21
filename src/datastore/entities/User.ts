import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', { schema: 'public' })
export class User {
  static entityName = 'User';

  public entityName: string = User.entityName;

  @PrimaryGeneratedColumn({
    type: 'integer',
    comment: 'Primary Object ID',
  })
  id: number;

  @Column('character varying', {
    length: 256,
    comment: "The user's userName",
  })
  userName: string;

  @Column('character varying', {
    unique: true,
    length: 256,
    comment: "The user's email",
  })
  email: string;

  @Column('character varying', {
    length: 256,
    comment: "The user's password",
  })
  password: string;
}
