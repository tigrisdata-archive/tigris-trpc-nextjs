import {
  Field,
  PrimaryKey,
  TigrisCollection,
  TigrisDataTypes,
} from "@tigrisdata/core";

@TigrisCollection("users")
class User {
  @PrimaryKey(TigrisDataTypes.INT64, { order: 1, autoGenerate: true })
  id?: string;

  @Field()
  username!: string;

  @Field(TigrisDataTypes.DATE_TIME, { timestamp: "createdAt" })
  createdAt?: Date;
}

export default User;
