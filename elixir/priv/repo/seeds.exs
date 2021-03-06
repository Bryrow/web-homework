# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Homework.Repo.insert!(%Homework.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Homework.Merchants.Merchant
alias Homework.Users.User
alias Homework.Transactions.Transaction

merchants = [
  %{
    id: "a83958c6-e4f6-4962-8cd5-06f565f06001",
    description: "Take a bite out of privacy",
    name: "Apple"
  }
];

users = [
  %{
    id: "cc0d09aa-e465-4d55-8c95-bd544a88d002",
    dob: "11/01/1960",
    first_name: "Tim",
    last_name: "Cook"
  }
];

transactions = [
  %{
    id: "441ba970-451f-4a26-825b-dbcdbcf6a003",
    amount: 300000,
    credit: true,
    debit: false,
    description: "MacBook Pro",
    merchant_id: "a83958c6-e4f6-4962-8cd5-06f565f06001",
    user_id: "cc0d09aa-e465-4d55-8c95-bd544a88d002"
  }
]

Enum.each(merchants, fn(data) ->
  Homework.Repo.insert!(%Merchant {
    id: data.id,
    name: data.name,
    description: data.description
  },
  on_conflict: :nothing)
end)

Enum.each(users, fn(data) ->
  Homework.Repo.insert!(%User {
    id: data.id,
    dob: data.dob,
    first_name: data.first_name,
    last_name: data.last_name
  },
  on_conflict: :nothing)
end)

Enum.each(transactions, fn(data) ->
  Homework.Repo.insert!(%Transaction {
    id: data.id,
    amount: data.amount,
    debit: data.debit,
    credit: data.credit,
    description: data.description,
    merchant_id: data.merchant_id,
    user_id: data.user_id
  },
  on_conflict: :nothing)
end)