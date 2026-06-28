// index.js

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function padZero(num, size) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

function generateNIK() {
  // PP = Kode Provinsi (11 s.d 94)
  const pp = padZero(getRandomInt(11, 94), 2);
  // CC = Kode Kota/Kabupaten (01 s.d 79)
  const cc = padZero(getRandomInt(1, 79), 2);
  // DD = Kode Kecamatan (01 s.d 99)
  const dd = padZero(getRandomInt(1, 99), 2);

  // DDMMYY = Tanggal Lahir. Untuk wanita DD ditambah 40.
  const isFemale = Math.random() > 0.5;
  let date = getRandomInt(1, 28);
  if (isFemale) date += 40;
  const mm = padZero(getRandomInt(1, 12), 2);
  const yy = padZero(getRandomInt(0, 99), 2); // Tahun 1900 - 1999 atau 2000 - 2099

  // SSSS = Nomor Urut (0001 s.d 9999)
  const ssss = padZero(getRandomInt(1, 9999), 4);

  return `${pp}${cc}${dd}${padZero(date, 2)}${mm}${yy}${ssss}`;
}

function generateNamaIndo() {
  const gelarDepan = ["", "", "Dr. ", "Drs. ", "Hj. ", "H. "];
  const namaDepan = ["Budi", "Agus", "Siti", "Ayu", "Rizqi", "Faisal", "Putri", "Reza", "Wahyu", "Dewi", "Eko", "Tri", "Sri", "Andi", "Yudi"];
  const namaBelakang = ["Santoso", "Wijaya", "Setiawan", "Sari", "Lestari", "Hidayat", "Pratama", "Saputra", "Wahyudi", "Kusuma", "Nugroho", "Siregar"];
  const gelarBelakang = ["", "", ", S.Kom", ", S.E.", ", S.T.", ", M.Kom.", ", S.Pd."];

  const gDepan = gelarDepan[getRandomInt(0, gelarDepan.length - 1)];
  const nDepan = namaDepan[getRandomInt(0, namaDepan.length - 1)];
  const nBelakang = namaBelakang[getRandomInt(0, namaBelakang.length - 1)];
  const gBelakang = gelarBelakang[getRandomInt(0, gelarBelakang.length - 1)];

  return `${gDepan}${nDepan} ${nBelakang}${gBelakang}`.trim();
}

function generateTelepon() {
  const prefixes = ["0812", "0813", "0821", "0822", "0852", "0853", "0811", "0814", "0815", "0816", "0855", "0856", "0857", "0858", "0817", "0818", "0819", "0859", "0877", "0878", "0838", "0831", "0832", "0833", "0895", "0896", "0897", "0898", "0899", "0881", "0882", "0883", "0884", "0885", "0886", "0887", "0888", "0889"];
  const prefix = prefixes[getRandomInt(0, prefixes.length - 1)];
  const number = padZero(getRandomInt(100000, 9999999), 7);
  return `${prefix}${number}`;
}

function generateAlamat(options = {}) {
  const jalan = ["Jl. Merdeka", "Jl. Sudirman", "Jl. M.H. Thamrin", "Jl. Gatot Subroto", "Jl. Ahmad Yani", "Jl. Diponegoro", "Jl. Pahlawan", "Jl. Gajah Mada"];
  const no = getRandomInt(1, 200);
  const rt = padZero(getRandomInt(1, 15), 2);
  const rw = padZero(getRandomInt(1, 15), 2);
  const kotaList = ["Jakarta", "Bandung", "Surabaya", "Semarang", "Yogyakarta", "Medan", "Makassar", "Bali", "Palembang", "Balikpapan"];
  const kota = options.kota || kotaList[getRandomInt(0, kotaList.length - 1)];
  const provinsi = options.provinsi ? `, Prov. ${options.provinsi}` : "";
  const kodePos = getRandomInt(10000, 99999);

  return `${jalan[getRandomInt(0, jalan.length - 1)]} No. ${no}, RT ${rt}/RW ${rw}, ${kota}${provinsi} ${kodePos}`;
}

function generateNPWP() {
  // Format NPWP: 99.999.999.9-999.999
  const p1 = padZero(getRandomInt(10, 99), 2);
  const p2 = padZero(getRandomInt(100, 999), 3);
  const p3 = padZero(getRandomInt(100, 999), 3);
  const p4 = getRandomInt(0, 9);
  const p5 = padZero(getRandomInt(1, 999), 3);
  const p6 = padZero(getRandomInt(0, 999), 3);
  return `${p1}.${p2}.${p3}.${p4}-${p5}.${p6}`;
}

function generateEmail(nama) {
  const cleanName = nama.replace(/[^a-zA-Z]/g, '').toLowerCase();
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "mail.com", "gov.id", "kemenkeu.go.id"];
  const domain = domains[getRandomInt(0, domains.length - 1)];
  return `${cleanName}${getRandomInt(1, 999)}@${domain}`;
}

function generateRekeningBank() {
  const banks = [
    { name: "BCA", code: "014", length: 10 },
    { name: "Mandiri", code: "008", length: 13 },
    { name: "BNI", code: "009", length: 10 },
    { name: "BRI", code: "002", length: 15 }
  ];
  const bank = banks[getRandomInt(0, banks.length - 1)];
  let acct = "";
  for (let i = 0; i < bank.length; i++) acct += getRandomInt(0, 9);
  return `${bank.name} - ${acct}`;
}

function generateEWallet() {
  const wallets = ["GoPay", "OVO", "DANA", "LinkAja", "ShopeePay"];
  const wallet = wallets[getRandomInt(0, wallets.length - 1)];
  return `${wallet} - ${generateTelepon()}`;
}

function generatePlatNomor() {
  const platDepan = ["B", "D", "E", "F", "Z", "T", "A", "G", "H", "K", "R", "AA", "AB", "AD", "AE", "AG", "L", "M", "N", "S", "W", "P", "DK"];
  const depan = platDepan[getRandomInt(0, platDepan.length - 1)];
  const angka = getRandomInt(1000, 9999);
  const abjad = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const char1 = abjad[getRandomInt(0, abjad.length - 1)];
  const char2 = abjad[getRandomInt(0, abjad.length - 1)];
  const char3 = abjad[getRandomInt(0, abjad.length - 1)];
  return `${depan} ${angka} ${char1}${char2}${char3}`;
}

function generateKK() {
  // PP = Kode Provinsi (11 s.d 94)
  const pp = padZero(getRandomInt(11, 94), 2);
  // CC = Kode Kota/Kabupaten (01 s.d 79)
  const cc = padZero(getRandomInt(1, 79), 2);
  // DD = Kode Kecamatan (01 s.d 99)
  const dd = padZero(getRandomInt(1, 99), 2);
  
  // DDMMYY = Tanggal Pencatatan
  const date = padZero(getRandomInt(1, 28), 2);
  const mm = padZero(getRandomInt(1, 12), 2);
  const yy = padZero(getRandomInt(0, 99), 2);
  
  // SSSS = Nomor Urut (0001 s.d 9999)
  const ssss = padZero(getRandomInt(1, 9999), 4);
  
  return `${pp}${cc}${dd}${date}${mm}${yy}${ssss}`;
}

function generateBPJS() {
  // BPJS format biasanya 13 digit
  let bpjs = "";
  for (let i = 0; i < 13; i++) {
    bpjs += getRandomInt(0, 9);
  }
  return bpjs;
}

function generateResi() {
  const couriers = [
    { prefix: "JB", length: 10 }, // J&T
    { prefix: "JNE", length: 11 },
    { prefix: "00", length: 12 }, // Sicepat
    { prefix: "JP", length: 10 }
  ];
  const courier = couriers[getRandomInt(0, couriers.length - 1)];
  let resi = courier.prefix;
  for (let i = 0; i < courier.length; i++) {
    resi += getRandomInt(0, 9);
  }
  return resi;
}

function generateIdentity(options = {}) {
  const nama = generateNamaIndo();
  return {
    id: padZero(getRandomInt(1, 999999), 6),
    nik: generateNIK(),
    no_kk: generateKK(),
    nama_lengkap: nama,
    email: generateEmail(nama),
    telepon: generateTelepon(),
    alamat: generateAlamat(options),
    npwp: generateNPWP(),
    bpjs: generateBPJS(),
    agama: ["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"][getRandomInt(0, 5)],
    kewarganegaraan: "WNI",
    status_perkawinan: ["Belum Kawin", "Kawin", "Cerai Hidup", "Cerai Mati"][getRandomInt(0, 3)],
    rekening_bank: generateRekeningBank(),
    e_wallet: generateEWallet(),
    kendaraan_plat: generatePlatNomor()
  };
}

const decoy = require('./decoy');
const middleware = require('./middleware');

module.exports = {
  generateNIK,
  generateKK,
  generateNamaIndo,
  generateTelepon,
  generateAlamat,
  generateNPWP,
  generateBPJS,
  generateRekeningBank,
  generateEWallet,
  generatePlatNomor,
  generateResi,
  generateIdentity,
  generateHoneypotData: decoy.generateHoneypotData,
  honeypotTrap: middleware.honeypotTrap,
  fastifyTrap: middleware.fastifyTrap,
  nestTrap: middleware.nestTrap,
  exportToCSV: require('./export').exportToCSV,
  exportToSQL: require('./export').exportToSQL
};