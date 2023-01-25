const Provinces = [
  'Bengo',
  'Benguela',
  'Bié',
  'Cabinda',
  'Cuando-Cubango',
  'Cuanza Norte',
  'Cuanza Sul',
  'Cunene',
  'Huambo',
  'Huíla',
  'Luanda',
  'Lunda Norte',
  'Lunda Sul',
  'Malanje',
  'Moxico',
  'Namibe',
  'Uíge',
  'Zaire',
]

const CountyList = [
  'Ambriz, Bula Atumba, Dande, Dembos, Nambuangongo, Pango Aluquém',
  'Balombo, Baía Farta, Benguela, Bocoio, Caimbambo, Catumbela, Chongorói, Cubal, Ganda, Lobito',
  'Andulo, Camacupa, Catabola, Chinguar, Chitembo, Cuemba, Cunhinga, Cuíto, Nharea',
  'Belize, Buco-Zau, Cabinda, Cacongo',
  'Calai, Cuangar, Cuchi, Cuito Cuanavale, Dirico, Mavinga, Menongue, Nancova, Rivungo',
  'Ambaca, Banga, Bolongongo, Cambambe, Cazengo, Golungo Alto, Gonguembo, Lucala, Quiculungo, Samba Caju',
  'Amboim, Cassongue, Cela, Conda, Ebo, Libolo, Mussende, Porto Amboim, Quibala, Quilenda, Seles, Sumbe',
  'Cahama, Cuanhama, Curoca, Cuvelai, Namacunde, Ombadja',
  'Bailundo, Cachiungo, Caála, Ecunha, Huambo, Londuimbali, Longonjo, Mungo, Chicala-Choloanga, Chinjenje, Ucuma',
  'Caconda, Cacula, Caluquembe, Gambos, Chibia, Chicomba, Chipindo, Cuvango, Humpata, Jamba, Lubango, Matala, Quipungo, Quilengues',
  'Belas, Cacuaco, Cazenga, Ícolo e Bengo, Kilamba Kiaxi, Luanda, Quiçama, Talatona, Viana',
  'Cambulo, Capenda-Camulemba, Caungula, Chitato, Cuango, Cuílo, Lóvua, Lubalo, Lucapa, Xá-Muteba',
  'Cacolo, Dala, Muconda, Saurimo',
  'Cacuso, Calandula, Cambundi-Catembo, Cangandala, Caombo, Cuaba Nzoji, Cunda-Dia-Baze, Luquembo, Malanje, Marimba, Massango, Mucari, Quela, Quirima',
  'Alto Zambeze, Bundas, Camanongue, Léua, Luau, Luacano, Luchazes, Cameia, Moxico',
  'Bibala, Camucuio, Moçâmedes, Tômbua, Virei',
  'Alto Cauale, Ambuíla, Bembe, Buengas, Bungo, Damba, Milunga, Mucaba, Negage, Puri, Quimbele, Quitexe, Sanza Pombo, Songo, Uíge, Zombo',
  'Cuimba, Mabanza Congo, Nóqui, Nezeto, Soyo, Tomboco',
]

const Counties = CountyList.map((item) =>
  item.split(',').map((count) => count.trim())
)

export { Counties, Provinces }
