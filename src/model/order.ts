import { DataTypes, Model, Optional, Association, Sequelize } from 'sequelize';
export default(sequelize:Sequelize, DataTypes:any)=>{
  class Order extends Model{
    public order_id!:number;
    public user_id!:number;
    public amount!:number;
  }
  Order.init(
    {
      order_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
       autoIncrement:true
      },
      user_id:
      {
       type:DataTypes.INTEGER,
       references:
       {
        model:"User",
        key:"userid"
       }
      },
      amount:
      {
       type:DataTypes.FLOAT
      }
      },
      {
        sequelize,
        modelName:'order'
      }
  );
    return  Order;
};