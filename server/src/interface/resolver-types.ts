import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  EmailAdress: any;
  JWT: any;
  USCurrency: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  addProduct?: Maybe<ProductMutationResponse>;
  delProduct?: Maybe<ProductMutationResponse>;
  delUser?: Maybe<UserMutationResponse>;
  loginUser?: Maybe<UserMutationResponse>;
  regUser?: Maybe<UserMutationResponse>;
  updateProduct?: Maybe<ProductMutationResponse>;
  updateUser?: Maybe<UserMutationResponse>;
};


export type MutationAddProductArgs = {
  description: Scalars['String'];
  img?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['USCurrency'];
  quantity: Scalars['Int'];
};


export type MutationDelProductArgs = {
  id: Scalars['ID'];
};


export type MutationDelUserArgs = {
  id: Scalars['ID'];
};


export type MutationLoginUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateProductArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  img?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['USCurrency']>;
  quantity?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['EmailAdress']>;
  id: Scalars['ID'];
  img?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  img?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['USCurrency']>;
  quantity?: Maybe<Scalars['Int']>;
};

export type ProductMutationResponse = {
  __typename?: 'ProductMutationResponse';
  code: Scalars['String'];
  message: Scalars['String'];
  product?: Maybe<Product>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  product?: Maybe<Product>;
  products?: Maybe<Array<Maybe<Product>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  auth?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['EmailAdress']>;
  id?: Maybe<Scalars['ID']>;
  img?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['Boolean']>;
};

export type UserMutationResponse = {
  __typename?: 'UserMutationResponse';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
  token?: Maybe<Scalars['JWT']>;
  user?: Maybe<User>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  EmailAdress: ResolverTypeWrapper<Scalars['EmailAdress']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JWT: ResolverTypeWrapper<Scalars['JWT']>;
  Mutation: ResolverTypeWrapper<{}>;
  Product: ResolverTypeWrapper<Product>;
  ProductMutationResponse: ResolverTypeWrapper<ProductMutationResponse>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  USCurrency: ResolverTypeWrapper<Scalars['USCurrency']>;
  User: ResolverTypeWrapper<User>;
  UserMutationResponse: ResolverTypeWrapper<UserMutationResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  EmailAdress: Scalars['EmailAdress'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  JWT: Scalars['JWT'];
  Mutation: {};
  Product: Product;
  ProductMutationResponse: ProductMutationResponse;
  Query: {};
  String: Scalars['String'];
  USCurrency: Scalars['USCurrency'];
  User: User;
  UserMutationResponse: UserMutationResponse;
};

export interface EmailAdressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAdress'], any> {
  name: 'EmailAdress';
}

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addProduct?: Resolver<Maybe<ResolversTypes['ProductMutationResponse']>, ParentType, ContextType, RequireFields<MutationAddProductArgs, 'description' | 'name' | 'price' | 'quantity'>>;
  delProduct?: Resolver<Maybe<ResolversTypes['ProductMutationResponse']>, ParentType, ContextType, RequireFields<MutationDelProductArgs, 'id'>>;
  delUser?: Resolver<Maybe<ResolversTypes['UserMutationResponse']>, ParentType, ContextType, RequireFields<MutationDelUserArgs, 'id'>>;
  loginUser?: Resolver<Maybe<ResolversTypes['UserMutationResponse']>, ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'email' | 'password'>>;
  regUser?: Resolver<Maybe<ResolversTypes['UserMutationResponse']>, ParentType, ContextType, RequireFields<MutationRegUserArgs, 'email' | 'password'>>;
  updateProduct?: Resolver<Maybe<ResolversTypes['ProductMutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'id'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UserMutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  img?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['USCurrency']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductMutationResponse'] = ResolversParentTypes['ProductMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
};

export interface UsCurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['USCurrency'], any> {
  name: 'USCurrency';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  auth?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['EmailAdress']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  img?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserMutationResponse'] = ResolversParentTypes['UserMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['JWT']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  EmailAdress?: GraphQLScalarType;
  JWT?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductMutationResponse?: ProductMutationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  USCurrency?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserMutationResponse?: UserMutationResponseResolvers<ContextType>;
};

