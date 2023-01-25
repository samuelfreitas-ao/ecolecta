import './style.css';
import api from '../../services/api';
import logo from '../../assets/logo.svg'

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { FiArrowLeft } from 'react-icons/fi';
import { LeafletMouseEvent } from 'leaflet';
import { FiledSet } from '../../components/fieldset';
import { Counties, Provinces } from '../../utils/data';
import { Input } from '../../components/input';
import { Select } from '../../components/select';
import { FieldGroup } from '../../components/field-group';

/*
 Sempre que criamos um estado para um array ou objecto, precisamos informa manualmente o tipo da variável que vai ser armazenado
*/
interface Item {
  id: number;
  title: string;
  image_url: string;
}

const CreatePoint = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState<Item[]>([]);
  const [provinces] = useState<string[]>(Provinces);
  const [counties, setCounties] = useState<string[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedCounty, setSelectedCounty] = useState<string>('');
  const [selectedMapPos, setSelectedMapPos] = useState<[number, number]>([0, 0]);
  const [initialMapPos, setInitialMapPos] = useState<[number, number]>([0, 0]);
  const [formDate, setFormDate] = useState({
    name: ''
    , email: ''
    , whatsapp: ''
  });
  const [selectedItems, setSelectItem] = useState<number[]>([]);

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    //auto inicia a posição actual e demarca
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setSelectedMapPos([latitude, longitude]);
      setInitialMapPos([latitude, longitude]);
    })
  }, []);

  function handleSelectProvince (event: ChangeEvent<HTMLSelectElement>) {
    const province = event.target.value;
    setSelectedProvince(province);

    const provinceIndex = provinces.indexOf(province)
    setCounties(Counties[provinceIndex])

  }

  function handleSelectCounty (event: ChangeEvent<HTMLSelectElement>) {
    const county = event.target.value;
    setSelectedCounty(county);
  }

  function handleMapClick (event: LeafletMouseEvent) {
    setSelectedMapPos([event.latlng.lat, event.latlng.lng]);
  }

  function handleInputChange (event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormDate({ ...formDate, [name]: value });
  }

  function handleSelectItem (id: number) {
    const allreadSelected = selectedItems.findIndex(item => item === id);

    if (allreadSelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectItem(filteredItems);
    } else {
      setSelectItem([...selectedItems, id]);
    }
  }

  async function handleSubmit (event: FormEvent) {
    event.preventDefault();
    const { name, email, whatsapp } = formDate;
    const province = selectedProvince;
    const county = selectedCounty;
    const [latitude, longitude] = selectedMapPos;
    const items = selectedItems;

    const data = {
      name,
      email,
      whatsapp,
      province,
      county,
      latitude,
      longitude,
      items
    };

    await api.post('points', data).then(request => {
      console.log(request.data);
      navigate('/');
    });

  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecolecta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro do <br /> ponto de coleta</h1>
        <FiledSet title='Dados'>
          <Input type='text' name='name' id='name' labelText='Nome da entidade'
            onChange={handleInputChange}
          />
          <FieldGroup>
            <Input type='email' name='email' id='email' labelText='E-mail'
              onChange={handleInputChange}
            />
            <Input type='text' name='whatsapp' id='whatsapp' labelText='WhatsApp'
              onChange={handleInputChange}
            />
          </FieldGroup >
        </FiledSet>
        <FiledSet title='Endereço' description='Selecione o endereço no mapa'>
          <Map center={initialMapPos} zoom={15} onclick={handleMapClick} >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedMapPos} />
          </Map>
          <FieldGroup>
            <Select options={provinces.map(item => ({ key: String(item), value: String(item) }))}
              labelText='Província' name='city' id='city' onChange={handleSelectProvince}
            />
            <Select options={counties.map(item => ({ key: String(item), value: String(item) }))}
              labelText='Municípios' name='county' id='county' onChange={handleSelectCounty}
            />
          </FieldGroup>
        </FiledSet>
        <FiledSet title='Items de colecta' description='Selecione um ou mais itens abaixo'>
          <ul className="items-grid">
            {items.map(item => (
              <li
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={selectedItems.includes(item.id) ? 'selected' : ''}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </FiledSet>
        <button type="submit">
          Cadastrar ponto de colecta
        </button>
      </form>
    </div>
  );
}

export default CreatePoint;