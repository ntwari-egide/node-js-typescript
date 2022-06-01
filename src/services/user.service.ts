import userModel, { User } from "../models/users";
import { omit, get } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
import config from 'config';
// import { excludedFields } from '../controllers/authentication'
import { signJwt } from '../utils/jwt';
import redisClient from '../utils/connectRedis';
import { DocumentType } from '@typegoose/typegoose';

export const createUser = async ( input: Partial<User>) => {
    const user = await userModel.create(input);

    return omit(user.toJSON() )
}

export const findUserById = async (id: string) => {
    const user = await userModel.findById(id)

    return omit(user?.toJSON())
}

// Find All users
export const findAllUsers = async () => {
    return await userModel.find();
  };
  
// Find one user by any fields
export const findUser = async (
    query: FilterQuery<User>,
    options: QueryOptions = {}
  ) => {
    return await userModel.findOne(query, {}, options).select('+password');
};
  
// Sign Token
export const signToken = async (user: DocumentType<User>) => {
    // Sign the access token
    const access_token = signJwt(
      { sub: user._id },
      {
        expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
      }
    );
  
    // Create a Session
    redisClient.set(user._id, JSON.stringify(user), {
      EX: 60 * 60,
    });
  
    // Return access token
    return { access_token };
};