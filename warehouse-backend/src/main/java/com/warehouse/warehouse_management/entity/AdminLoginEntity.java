package com.warehouse.warehouse_management.entity;


import jakarta.persistence.*;
import java.time.LocalDateTime;

	@Entity
	@Table(name = "admin_login")
	public class AdminLoginEntity {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String username;
	    private String password;
	    private LocalDateTime loginTime;
	    private LocalDateTime logoutTime;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public LocalDateTime getLoginTime() {
			return loginTime;
		}
		public void setLoginTime(LocalDateTime loginTime) {
			this.loginTime = loginTime;
		}
		public LocalDateTime getLogoutTime() {
			return logoutTime;
		}
		public void setLogoutTime(LocalDateTime logoutTime) {
			this.logoutTime = logoutTime;
		}

	    
	}
