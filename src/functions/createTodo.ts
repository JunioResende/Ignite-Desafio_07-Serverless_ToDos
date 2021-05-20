import {document} from '../utils/dynamoDbClient'


import { APIGatewayProxyHandler } from 'aws-lambda';
import {v4 as uuid} from 'uuid';
import * as dayjs from 'dayjs';

interface ICreateTodo {
  id: string;
  title: string;
  deadline: string;
}


export const handle: APIGatewayProxyHandler = async (event) => {
   const {id, title, deadline} = JSON.parse(event.body) as ICreateTodo;
   
   await document.put({
      TableName: 'todos',
      Item: {
        id: uuid(),
        user_id: id,
        title, 
        done: false,
        deadline: dayjs(deadline).format('DD/MM/YYYY')
      }
    }).promise();
  
   

   return {
     statusCode: 201,
     body: JSON.stringify({
        message: "Todo created",        
     }),
     headers: {
       "Content-Type": "application/json"
     }
   }
};