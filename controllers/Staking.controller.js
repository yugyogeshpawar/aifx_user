const connection = require("../config/db.config");
const { promisify } = require("util");
const query = promisify(connection.query).bind(connection);

const getStakingData = async (req, res) => {
  const query1 = `SELECT * FROM tbl_adminChangeWallet where Status='0'`;
  const output = await query(query1);
  if (output.length === 0) {
    return res.status(400).send({
      message: "No wallet is currently available for staking",
    });
  } else {
    const user = output[0];
    return res.status(200).send({
      message: "Wallet is available for staking",
      wallet: user.walletAddress,
    });
  }
};

const stakingRequest = async (req, res) => {
  const user = req.user;

  //Get Member Name
  const query1 = `SELECT * FROM tbl_memberreg WHERE member_user_id='${user}'`;
  let output = await query(query1);
  if (output.length === 0) {
    return res.status(400).send({
      message: "Invalid user id",
    });
  }
  const member_name = output[0].member_name;

  const currentDate = new Date();

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Kolkata",
  };

  let sys_date = currentDate
    .toLocaleString("en-IN", options)
    .replace(",", "")
    .replaceAll("/", "-");

  const arr = sys_date.split("-");
  sys_date = `${arr[2]}-${arr[1]}-${arr[0]}`;

  const option = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  };

  const time = currentDate.toLocaleString("en-IN", option);

  sys_date = `${sys_date} ${time}`;

  console.log(sys_date);

  const { wallerAddress, amount, transactionHash } = req.body;
  const query2 = `INSERT INTO tbl_deposit (member_user_id , member_name , sys_date , investment , transaction_id , walletAddress, deposit_type) VALUES ('${user}' , '${member_name}' , '${sys_date}' , '${amount}' , '${transactionHash}' , '${wallerAddress}'  , 'Wallet')`;

  try {
    const insertDeposit = await query(query2);
  } catch (err) {
    console.log(`error`, err);
    return res.status(400).send({
      message: "Error while inserting data",
    });
  }

  return res.status(200).send({
    message: "Staking request submitted successfully",
  });
};

const stakingSummary = async (req, res) => {
  const user = req.user;
  const query1 = `SELECT * FROM tbl_deposit WHERE member_user_id='${user}'`;
  try {
    const output = await query(query1);
    return res.status(200).send({
      message: "Staking summary",
      data: output,
    });
  } catch (err) {
    console.log(`error`, err);
    return res.status(400).send({
      message: "Error while fetching data",
    });
  }
};

module.exports = {
  getStakingData,
  stakingRequest,
  stakingSummary,
};
