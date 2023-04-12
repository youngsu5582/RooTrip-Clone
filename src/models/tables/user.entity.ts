import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate,
}
from 'typeorm';
import {hashSync,compareSync} from 'bcrypt';
type GenderType = 'm'|'w';
@Entity({name:"user"})
export default class User{

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({ length: 100 , nullable:true })
    email: string;

    @Column()
    name:string;

    @Column({nullable:true,type:String})
    nickname:string|null;

    @Column({nullable:true,type:String})
    password:string|null;

    @Column({nullable:true,type:String})
    gender : GenderType|null;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({nullable:true,type:String})
    refreshToken : string|null;

    
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(this.password){
            this.password = hashSync(this.password,10);
        }
    }

    async comparePassword(unencryptedPassword: string){
        
        return compareSync(unencryptedPassword,this.password!);
    }

}