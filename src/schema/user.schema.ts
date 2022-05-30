import { object, string, TypeOf } from "zod";

export const createUserSchema = object({

    body: object({
        name: string({ required_error: 'Name is required'}),
        email: string({ required_error: 'Email is required'}).email(
            'Invalid email'
        ),
        password: string({ required_error: 'Password is required'})
            .min(8, 'Password must be altleast 8 characters')
            .max(32, 'Password must be atmost 32 characters'),
        passwordConfirm: string({ required_error: 'Please confirm your password'}),

        // validte if old pass == confirm password
    }).refine( data => data.password == data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Password do not match'
    }),

})

export const loginUserSchema = object ({
    body: object ({
        name: string({ required_error: 'Name is required'}).email(
            'Invalid username or password'
        ),
        password: string({ required_error: 'Password is required'}).min(
            8,
            'Invalid username or password'
        )
    }) 
})


export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body']