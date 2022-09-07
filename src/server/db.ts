import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL
const client = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

//Get all the clothes.
export async function getClothes(){
  const sql = `SELECT * FROM clothes `;
  const result = await client.query(sql);
  const clothes = result.rows.map((cloth:any) => Object.assign(cloth));
  return clothes;
}

//Get cloth by id.
export async function getClothesByBrand(brand:string){
  const sql = `SELECT * FROM clothes WHERE brand=$1`;
  const result = await client.query(sql,[brand]);
  const clothes = result.rows.map((cloth:any) => Object.assign(cloth));
  return clothes;
}

export async function getClothesBySector(sector:string){
  const sql = `SELECT * FROM clothes WHERE sector=$1`;
  const result = await client.query(sql,[sector]);
  const clothes = result.rows.map((cloth:any) => Object.assign(cloth));
  return clothes;
}

// Add officer to users table.
export async function addToOrders(size:any , quantity:any , userId:number ,clothId:number){
  const sql = 'INSERT INTO orders(size ,quantity ,user_id, cloth_id) VALUES($1, $2, $3, $4)';
  await client.query(sql, [size , quantity , userId , clothId]);
  return "Success"
}

// Add officer to users table.
export async function addToUsers(user:any){
  const userArray = Object.values(user);
  const sql1 = 'SELECT COUNT(email) FROM users WHERE email = $1';
  let result = await client.query(sql1, [user.email]);
  if (result.rows[0].count >= 1) return "user with the same email already exist";
  const sql = 'INSERT INTO users(first_name ,last_name ,phone_number, city , adress , email, password) VALUES($1, $2, $3, $4, $5, $6, $7)';
  await client.query(sql, userArray);
  const sql2 = `SELECT * FROM users WHERE email=$1 AND password=$2`;
  const result2 = await client.query(sql2 , [user.email , user.password]);
  const user2 = result2.rows.map((user:any) => Object.assign(user));
  return user2[0]
}

//Get all the clothes.
export async function checkIfUserExist(email:string  , password:string){
  const sql = `SELECT * FROM users WHERE email=$1 AND password=$2`;
  const result = await client.query(sql , [email , password]);
  const user = result.rows.map((user:any) => Object.assign(user));
  if(user.length == 1) return user[0]
  else if(user.length == 0) return "user dosen't exist"
}