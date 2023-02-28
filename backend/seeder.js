const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:root@cluster0.hufkb.mongodb.net/?retryWrites=true&w=majority";

let obj = {
  name: "",
  department: "",
  gender: "",
  email: "",
  voucherCode: ""
};

let data = [];
let voucher =  ["3whxt-4r6rq-3kqrv-yvft7-9yfhz", "4k77y-t749p-4vkwm-63xvr-gpmvz", "w4g27-y3cjr-jkqpq-j723k-r9ygz", "jjfrh-k373f-ghxwr-976h3-h37xz", "pgtvj-f2c4q-fj6rc-972h4-2tyjz", "dfwr3-hxck6-rgd3p-3wjwd-k3cjz", "dgkc9-t9c4r-y69j3-4yxdv-kmy7z", "wpjjv-vwqgh-j33t2-jp22r-4mdkz", "krw9w-49qm9-rfjtf-mmjf9-gj94z", "77fq3-tvr6f-xtwjw-434p6-gvyjz", "vr7wd-ymrjd-4wx3v-433mf-mkvgz", "qqtwf-rkrcp-hwffk-rdc6h-9rrkz", "y6xg7-ckc63-vkwdy-mqkdv-qd2gz", "jxxqy-t4v2g-vtf3j-trk2h-2y64z", "7c99r-xvtx4-p943x-2m2jh-wwvvz", "4p4r7-cw694-hm49t-qtgdc-rd66z", "79dpw-wj947-9dj9x-vx46y-2j9gz", "jjrmk-7gjk7-x6jgc-fgwwx-j7jtz", "wjmm9-3c4jj-rtyc4-x6dfc-kf9pz", "ct4qd-jmmhw-6qgjc-dg6d7-w22pz", "y9kwp-4vp3k-4ty4d-xdwdv-2gxgz", "gfdt3-9cjrd-xfj62-q9rmv-7mvhz", "pt9p9-dwdgw-rkxm3-7pyff-gjwrz", "fgjkw-mjhty-9jhv7-frfck-2dy9z", "4m7cw-cykjk-2ycc2-2kc2j-ggftz", "vkrm6-6r33y-ppjrm-4yw46-7v2cz", "jpj24-dffv2-q3q4t-wqmjk-7tc3z", "mm734-m4ctf-3d24h-vwtk3-vdhkz", "74g34-2hxdy-942fc-vk6gx-qfhmz", "y9c74-76vjt-dx3gf-792gm-mw6fz", "g294f-jmt7p-93qxc-4vr3p-ytqhz", "c6yfy-dwvk6-g6whx-23djd-yxjrz", "4y4cd-xwwrc-k9626-vgxrv-ykq4z", "9j3h6-x2k3h-htp4v-mm2j3-jyfmz", "664qm-qmgvy-fd3td-mvmcf-hyx6z", "9dgjx-w7d2p-k2jkt-jhtm9-cqqcz", "pccpr-wg9k7-qmm9d-7khf6-c4g2z", "j9c2x-qfxd3-xfcvg-g9t7c-w4wdz", "y9th7-mf99x-pyqc9-7m7qw-trkvz", "w6kdv-92hvh-kycj3-cqqdh-kfyhz", "736yt-rdpg9-pdy4v-p46c3-d4fvz", "24qwc-j2rg9-wq76m-97749-v347z", "hxvjh-yvrjc-tdrp6-cfgyt-vqxhz", "6pxgx-xcmdk-p7fkx-29fkm-3jk3z", "dryxy-gx973-4krjw-mjmdc-2g3hz", "2vdc4-v9dpp-hcvrd-kp9vj-gdr3z", "wx9ty-6g3q6-rj4w3-4ypcj-9m4wz", "ht3rh-r32q2-3p3xv-7jmgf-hmvgz", "gchxf-djryx-hhtcr-vtd6q-6vppz", "cf6p9-cdhmk-jy9gp-62d7r-7k2wz"];

function seedData() {
  for(let i = 0; i < voucher.length; i++) {
    let currentObj = {...obj};
    currentObj.voucherCode = voucher[i];
    data.push(currentObj);
  }
}

seedData();
console.log(data);

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const db = client.db("AzureVouchers");
  const collection = db.collection("users");
  collection.insertMany(data, function(err, res) {
    console.log("Data inserted successfully!");
    client.close();
  });
});