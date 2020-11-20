import './style.css';
import api from '../../services/api';
import logo from '../../assets/logo.svg'

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import { LeafletMouseEvent } from 'leaflet';

const UrlAPI = 'https://www.mwangosoft.com/api';
/*
 Sempre que criamos um estado para um array ou objecto, precisamos informa manualmente o tipo da variável que vai ser armazenado
*/
interface Item {
    id:number;
    title:string;
    image_url: string;
}
interface IProvince {
    id_provincia:number;
    nome_provincia:string;
    codigo_provincia: string;
    capital_provincia: string;
    //object:object;
}
interface ICounty {
    id_municipio:number;
    nome_municipio:string;
}

const CreatePoint = () =>{
    const [items, setItems] = useState<Item[]>([]);
    const [provinces, setProvinces] = useState<IProvince[]>([]);
    const [counties, setCounties] = useState<ICounty[]>([]);
    const [selectedProvince, setSelectedProvince] = useState('0');
    const [selectedCounty, setSelectedCounty] = useState('0');
    const [selectedMapPos, setSelectedMapPos] = useState<[number, number]>([0, 0]);
    const [initialMapPos, setInitialMapPos] = useState<[number, number]>([0, 0]);
    const [formDate, setFormDate] = useState({
        name:''
        ,email:''
        ,whatsapp:''
    });
    const [selectedItems, setSelectItem] = useState<number[]>([]);
    const history = useHistory();

    useEffect(()=>{
        //Faz requisição à api
        api.get('items').then(response=>{
            setItems(response.data);
        });
    }, []);
    
    useEffect(()=>{
        axios.get<IProvince[]>(UrlAPI+'/provincia').then(response=>{
            
            const provinceList = response.data.map(code=>code);
           // console.log(provinceList);
            setProvinces(provinceList);
        });
    }, []);

    useEffect(()=>{
        if(selectedProvince==='0'){
            return;
        }
        axios.get<ICounty[]>(`${UrlAPI}/municipio/${selectedProvince}`).then(response=>{
            const countyList = response.data.map(county=>county);
            setCounties(countyList);
        });
    }, [selectedProvince]);

    useEffect(()=>{
        //auto inicia a posição actual e demarca
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            setSelectedMapPos([latitude, longitude]);
            setInitialMapPos([latitude, longitude]);
        })
    },[]);

    function handleSelectProvince(event: ChangeEvent<HTMLSelectElement>){
        const province = event.target.value;
        setSelectedProvince(province);
    }

    function handleSelectCounty(event: ChangeEvent<HTMLSelectElement>){
        const county = event.target.value;
        setSelectedCounty(county);
    }

    function handleMapClick(event: LeafletMouseEvent){
        setSelectedMapPos([event.latlng.lat, event.latlng.lng]);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        // ... spread operator (copia os objecto que já tem na declaração da função)
        setFormDate({... formDate, [name]: value});
    }

    function handleSelectItem(id: number){
        const allreadSelected = selectedItems.findIndex(item => item === id);

        if(allreadSelected >= 0){
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectItem(filteredItems);
        }else{
            // ... reaproveita o que já foi selecionado e acrescenta outros
            setSelectItem([... selectedItems, id]);
        }
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        const { name, email, whatsapp } = formDate;
        const province = selectedProvince;
        const county = selectedCounty;
        const [latitude, longitude] = selectedMapPos;
        const items = selectedItems;

        const data = {
            name
            ,email
            ,whatsapp
            ,province
            ,county
            ,latitude
            ,longitude
            ,items
        };

        await api.post('points', data).then(request=>{
            console.log(request.data);
            history.push('/');
        });
        

    }

    return (
        <div id="page-create-point">
          <header>
              <img src={logo} alt="Ecolecta"/>
            
          <Link to="/">
              <FiArrowLeft/>
              Voltar para home
          </Link>
          </header>

        <form onSubmit={handleSubmit}>
            <h1>Cadastro do <br/> ponto de coleta</h1>
            <fieldset>
                <legend>
                    <h2>Dados</h2>
                </legend>
                <div className="field">
                    <label htmlFor="name">Nome da entidade</label>
                    <input type="text" name="name" id="name" onChange={handleInputChange} />
                </div>
                <div className="field-group">
                    <div className="field">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
                        </div>
                    </div>
                </div>
            </fieldset>
            
            <fieldset>
                <legend>
                    <h2>Endereço</h2>
                    <span>Selecione o endereço no mapa</span>
                </legend>
                <Map center={initialMapPos} zoom={15} onClick={handleMapClick} >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={selectedMapPos} />
                </Map>
                <div className="field-group">
                    <div className="field">
                        <label htmlFor="city"> Província </label>
                        <select 
                            name="city"
                            onChange={handleSelectProvince}
                            value={selectedProvince}
                        >
                            <option value="0">Selecione uma província</option>
                            { 
                            provinces.map(province=>(
                                <option key={province.nome_provincia} value={province.nome_provincia}>{province.nome_provincia}</option>
                            )) 
                            }
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="count"> Município </label>
                        <select 
                            name="county"
                            value={selectedCounty}
                            onChange={handleSelectCounty}
                        >
                            <option value="0">Selecione um município</option>
                            { 
                            counties.map(count=>(
                                <option key={count.nome_municipio} value={count.nome_municipio}>{count.nome_municipio}</option>
                            )) 
                            }
                        </select>
                    </div>
                </div>
            </fieldset>
            
            <fieldset>
                <legend>
                    <h2>Items de colecta</h2>
                    <span>Selecione um ou mais itens abaixo</span>
                </legend>
                <ul className="items-grid">
                    {items.map(item=>(
                        <li 
                            key={item.id } 
                            onClick={()=>handleSelectItem( item.id )} 
                            className={selectedItems.includes(item.id) ? 'selected' : ''}
                        >
                            <img src={item.image_url} alt={item.title}/>
                            <span>{item.title}</span>
                        </li>
                    ))}
                </ul>
            </fieldset>
            <button type="submit">
                Cadastrar ponto de colecta
            </button>
        </form>
        </div>
    );
}

export default CreatePoint;