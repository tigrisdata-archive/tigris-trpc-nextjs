import {
  Field,
  PrimaryKey,
  SearchField,
  TigrisCollection,
  TigrisDataTypes,
} from "@tigrisdata/core";

@TigrisCollection("posts")
class Post {
  @PrimaryKey(TigrisDataTypes.INT64, { order: 1, autoGenerate: true })
  id?: string;

  @Field()
  @SearchField()
  username!: string;

  @Field()
  @SearchField()
  text!: string;

  @Field({ timestamp: "createdAt" })
  @SearchField({ sort: true })
  createdAt?: Date;
}

export default Post;
