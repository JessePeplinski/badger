import { Mongo } from 'meteor/mongo';
 
export const Tasks = new Mongo.Collection('tasks');
export const Talk = new Mongo.Collection('talk');
export const User = new Mongo.Collection('user');