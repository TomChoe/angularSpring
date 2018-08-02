package com.example.springFullStack.models;

import lombok.*;
import javax.persistence.*;

@Data
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity @Table(name = "POSTS")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "PRICE")
    private int price;

    @Column(name = "BODY")
    private String body;

    public Post(String title, int price, String body) {
        this.title = title;
        this.price = price;
        this.body = body;
    }

}