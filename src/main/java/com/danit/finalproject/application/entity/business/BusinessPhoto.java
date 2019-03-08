package com.danit.finalproject.application.entity.business;

import com.danit.finalproject.application.entity.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Table(name = "business_photos")
@Data
@NoArgsConstructor
public class BusinessPhoto extends BaseEntity {

  @Column(name = "photo")
  private String photo;

}
