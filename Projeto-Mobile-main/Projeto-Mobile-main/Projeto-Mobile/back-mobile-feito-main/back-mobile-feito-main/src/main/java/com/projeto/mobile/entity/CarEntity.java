package com.projeto.mobile.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_Car")
public class CarEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String imagem;
    private String rating ;
    private String descricao;
    
    private Boolean isFavorite;

    
	public CarEntity() {
	 
	}
	public CarEntity(Long id, String nome, String imagem, String rating, String descricao, Boolean isFavorite) {
		 
		this.id = id;
		this.nome = nome;
		this.imagem = imagem;
		this.rating = rating;
		this.descricao = descricao;
		this.isFavorite = isFavorite;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getImagem() {
		return imagem;
	}
	public void setImagem(String imagem) {
		this.imagem = imagem;
	}
	public String getRating() {
		return rating;
	}
	public void setRating(String rating) {
		this.rating = rating;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public Boolean getIsFavorite() {
		return isFavorite;
	}
	public void setIsFavorite(Boolean isFavorite) {
		this.isFavorite = isFavorite;
	}
  
}
