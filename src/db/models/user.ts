import {
  Field,
  PrimaryKey,
  // SearchField,
  TigrisCollection,
  TigrisDataTypes,
} from "@tigrisdata/core";

@TigrisCollection("users")
class User {
  @PrimaryKey(TigrisDataTypes.INT64, { order: 1, autoGenerate: true })
  id?: string;

  @Field()
  // @SearchField()
  username!: string;

  @Field(TigrisDataTypes.DATE_TIME, { timestamp: "createdAt" })
  // @SearchField({ sort: true })
  createdAt?: Date;
}

export default User;
