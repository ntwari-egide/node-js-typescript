import { getModelForClass, index, modelOptions, pre, prop } from "@typegoose/typegoose";
import bcrypt from 'bcryptjs'

// hashing password before saving and updating a user

@index({ email: 1})

@pre<User> ('save', async function () {

    // Hash password if the password is new or update
    if(! this.isModified ('password')) return;

    this.password = await bcrypt.hash(this.password, 12);

})


@modelOptions({
    // add createdAt and updatedAt fields
    
    schemaOptions: {
        timestamps: true
    }
})

export class User {
    @prop()
    name!: string;

    @prop({  unique: true, required: true })
    email!: string 

    @prop({ required: true })
    password!: string

    @prop({ default: 'user' })
    role!: string

    // method of comparing passwords

    async comparePasswords( hashedPassword: string, candidatePassword: string) {
        return await  bcrypt.compare( hashedPassword, candidatePassword )
    }
}


// creating the model from the class

const userModel = getModelForClass(User)

export default userModel