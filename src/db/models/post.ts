import {
  Field,
  PrimaryKey,
  TigrisCollection,
  TigrisDataTypes,
} from "@tigrisdata/core";

@TigrisCollection("posts")
class Post {
  @PrimaryKey(TigrisDataTypes.INT64, { order: 1, autoGenerate: true })
  id?: string;

  @Field()
  name!: string;

  @Field()
  text!: string;

  @Field({ timestamp: "createdAt" })
  createdAt?: Date;
}

export default Post;